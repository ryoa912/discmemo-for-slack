var self = this;

function create() {
    var input_text = "";
    input_text = $("#input_textbox").val();

    if ($("#checkbox_name").is(':checked')) {
        input_text = self.deleteNames(input_text);
    }

    if ($("#checkbox_date").is(':checked')) {
        input_text = self.deleteDateWords(input_text);
    }

    if ($("#checkbox_edited").is(':checked')) {
        input_text = self.deleteEditedWords(input_text);
    }

    if ($("#checkbox_br").is(':checked')) {
        input_text = self.deleteBRs(input_text);
    }

    if ($("#checkbox_teams").is(':checked')) {
        input_text = self.replaceNames(input_text);
    }
    
    var row_interval = parseInt($("#row_interval").val(), 10);
    var row_number = parseInt($("#row_number").val(), 10);
    if ($("#checkbox_del_row").is(':checked')) {
        input_text = self.deleteRow(input_text, row_interval, row_number);
    }

    $("#output_textbox").val(input_text);
}

function reverse() {
    var output = $("#output_textbox").val();
    $("#input_textbox").val(output);
}

function deleteNames(val) {
    var text = val;
    return text.replace(/\n(.+)\s\[/g, "[");
}

function deleteDateWords(val) {
    var text = val;
    return text.replace(/\[(.+)\]/g, "");
}

function deleteEditedWords(val) {
    var text = val;
    text = text.replace(/\（編集済み\）/g, "");
    return text.replace(/\(edited\)/g, "");
}

function deleteBRs(val) {
    var text = val;
    return text.replace(/(\n\s*)+/g, "\n");
}

function replaceNames(val) {
    const mark = 'さんのプロフィール画像。';
    var text = val.replace(/\r\n|\r/g, "\n");
    var lines = text.split('\n');
    var outText = new String();

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes(mark)) {
            outText = outText + lines[i].replace(mark, '') + '\n';
        }
    }

    return outText;
}

function deleteRow(val, row_interval, row_number) {
    var text = val.replace(/\r\n|\r/g, "\n");
    var lines = text.split('\n');
    var outText = new String();

    for (var i = 0; i < lines.length; i++) {
        var row = i % row_interval;
        if (row !== row_number-1) {
            outText = outText + lines[i] + '\n';
        }
    }

    return outText;
}
