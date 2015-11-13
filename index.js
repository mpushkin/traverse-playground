/* global $, ace, traverse */
$(function() {
	var editor = ace.edit("editor");

	editor.setTheme("ace/theme/monokai");
	editor.getSession().setMode("ace/mode/javascript");
	editor.setShowPrintMargin(false);
	editor.commands.addCommand({
		bindKey: {win: 'Ctrl-L', mac: 'Command-L'},
		exec: function(editor) {
			editor.insert("console.log();");
			editor.selection.moveCursorBy(0, -2);
		}
	});
	editor.commands.addCommand({
		bindKey: {win: 'Ctrl-T', mac: 'Command-T'},
		exec: function(editor) {
			editor.insert("traverse()");
			editor.selection.moveCursorBy(0, -1);
		}
	});

	var results = ace.edit("results");
	results.setTheme("ace/theme/monokai");
	results.getSession().setMode("ace/mode/text");
	results.setShowPrintMargin(false);
	results.setReadOnly(true);

	editor.getSession().on('change', updateResult);
	updateResult();

	function updateResult() {
		var code = editor.getValue();
		var result = executeCode(code);
		results.setValue(result);
		results.selection.clearSelection();
	}

	function executeCode(code) {
		var results = [];
		try {
			code = code.split('console.log').join('__out');
			var func = new Function('traverse', '__out', code);
			func(window.traverse, out);
			return results.join('\n');
		}
		catch (err) {
			return err.toString();
		}

		function out() {
			var args = Array.prototype.slice.call(arguments, 0);
			args = args.map(function(arg) {
				if (Object.prototype.toString.call(arg) === "[object Object]") {
					return JSON.stringify(arg, null, 4);
				}
				return arg;
			});
			results.push(args.join(' '));
		}
	}

	$('#ex1').click(loadExampleById.bind(this, 'ex1'));
	$('#ex2').click(loadExampleById.bind(this, 'ex2'));
	$('#ex3').click(loadExampleById.bind(this, 'ex3'));
	loadExampleById('ex0');

	function loadExampleById(exampleId) {
		$.get('/examples/' + exampleId + '.js', function(code) {
			editor.setValue(code);
			editor.selection.clearSelection();
		}, 'text');
	}
});