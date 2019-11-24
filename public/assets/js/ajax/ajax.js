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
                        console.log(resp);
                        msg('success', 'Usuário deletado com sucesso!');
                        table.remove();
                        return "ok";
                    }else{
                        msg('error', 'Você não pode deletar a si mesmo!');
                        return "ok";
                    }

                }
            })
        }
    })
}

function deleteCategory(id) {
    var table = document.getElementById(id);
    Swal({
        title: 'Deseja remover a categoria?',
        showCancelButton: true,
        confirmButtonText: 'Sim, pode remover!',
        cancelButtonText: 'Cancelar',
        text: 'Essa ação não poderá ser desfeita.',
        type: 'warning',
        confirmButtonColor: '#F54400',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            $.ajax({
                url: '/deletar/categoria/' + id,
                method: 'GET',
                data: {},
                success: function (resp) {
                    if (resp) {
                        console.log(resp);
                        msg('success', 'Categoria deletada com sucesso!');
                        table.remove();
                        return "ok";
                    }
                }
            })
        }
    })
}