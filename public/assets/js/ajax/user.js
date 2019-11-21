function msg(type, text) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type: type,
        title: text
    })
}

function deleteUser(id) {
    var table = document.getElementById(id);
    Swal({
        title: 'Deseja remover o usuário?',
        showCancelButton: true,
        confirmButtonText: 'Sim, pode remover!',
        cancelButtonText: 'Cancelar',
        text: 'Essa ação não poderá ser desfeita.',
        type: 'warning',
        confirmButtonColor: '#F54400',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            $.ajax({
                url: '/deletar/' + id,
                method: 'GET',
                data: {},
                success: function (resp) {
                    if (resp) {
                        msg('success', 'Usuário deletado com sucesso!');
                        table.remove();
                        return "ok";
                    }

                }
            })
        }
    })
}
    function editUser(id){
        alert(id);
        let login = $('#'+id).children('td[data-target-login]').text();
        let senha = document.getElementById('senha');
        let confirmar_senha = document.getElementById('confirmar_senha');
        let email = document.getElementById('email');
        if(senha == confirmar_senha){
            Swal({
                title: 'Editar Usuário',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                html:
                    '<label>Login</label>'+
                  '<input id="swal-input1" placeholder="Login..." class="swal2-input" value="'+login+'">' +
                  '<label>Senha</label>'+
                  '<input id="swal-input2" placeholder="Senha..." class="swal2-input" value="'+senha+'">' +
                  '<label>Confirmar Senha</label>'+
                  '<input id="swal-input3" placeholder="Confirmar senha..." class="swal2-input" value="'+confirmar_senha+'">' +
                  '<label>Email</label>'+
                  '<input id="swal-input4" placeholder="Email..." class="swal2-input" value="'+email+'">',
                focusConfirm: false,
                preConfirm: () => {

        $.ajax({
            url: '/editar/'+id,
            method: 'POST',
            data: {},
            success: function (resp) {
                if (resp) {
                    msg('success', 'Usuário editado com sucesso!');

                     }
                }
            })
        }
        })
    }
}