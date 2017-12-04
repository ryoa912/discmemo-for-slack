var self = this;

function create(){
    var input_text = $("#input_textbox").val();
    console.log(input_text);
    console.log("checkbox_name:" + $("#checkbox_name").is(':checked'));
    console.log("checkbox_date:" + $("#checkbox_date").is(':checked'));
    console.log("checkbox_edited:" + $("#checkbox_edited").is(':checked'));
    console.log("checkbox_br:" + $("#checkbox_br").is(':checked'));

    if($("#checkbox_name").is(':checked')){
        console.log("delete name");
        self.deleteNames(input_text);
    }

    if($("#checkbox_date").is(':checked')){
        console.log("delete dates");
        self.deleteDateWords(input_text);
    }

    if($("#checkbox_edited").is(':checked')){
        console.log("delete edited word");
        self.deleteEditedWords(input_text);
    }

    if($("#checkbox_br").is(':checked')){
        console.log("delete br");
        self.deleteBRs(input_text);
    }

    $("#output_textbox").val(input_text);
}

function deleteNames(val){
    console.log("[deleteNames]"+val);
}

function deleteDateWords(val){

}

function deleteEditedWords(val){

}

function deleteBRs(val){
    
}