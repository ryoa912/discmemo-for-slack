var self = this;

function create(){
    var input_text = "";
    input_text = $("#input_textbox").val();

    if($("#checkbox_name").is(':checked')){
        input_text = self.deleteNames(input_text);
    }

    if($("#checkbox_date").is(':checked')){
        input_text = self.deleteDateWords(input_text);
    }

    if($("#checkbox_edited").is(':checked')){
        input_text = self.deleteEditedWords(input_text);
    }

    if($("#checkbox_br").is(':checked')){
        input_text = self.deleteBRs(input_text);
    }

    $("#output_textbox").val(input_text);
}

function deleteNames(val){    
    var text = val;
    return text.replace( /\n(.+)(\n|\s)\[/g , "[" );
}

function deleteDateWords(val){
    var text = val;
    return text.replace( /\[(.+)\]/g , "" );
}

function deleteEditedWords(val){
    var text = val;
    text = text.replace( /\（編集済み\）/g , "" );
    return text.replace( /\(edited\)/g , "" );
}

function deleteBRs(val){
    var text = val;
    return text.replace( /(\n\s*)+/g , "\n" );
}