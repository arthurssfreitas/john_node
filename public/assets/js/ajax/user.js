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
        let login = document.getElementById('login').value;
        let senha = document.getElementById('senha').value;
        let confirmar_senha = document.getElementById('confirmar_senha').value;
        let email = document.getElementById('email').value;
        if(senha == confirmar_senha){
        $.ajax({
            url: '/editar/'+id,
            method: 'GET',
            data: {},
            success: function (resp) {
                if (resp) {
                    msg('success', 'Usuário editado com sucesso!');
                }

            }
        })
        }
    }