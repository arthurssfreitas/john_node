function deletar(id)
{
    if(confirm("Are you sure you want to delete this Record?")){
        var info = id;
        var table = document.getElementById(info);
        var html = $.ajax({
        type: "GET",
        url: "/deletar/"+info,
        data: info,
        async: true,
        success: function( data )
				{
                    table.remove();
					alert( data );
				}
        }).responseText;

        if(html == "success")
        {
            return true;
        }
        return false;
    }
}