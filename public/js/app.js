$(function () {

    const render = function () {
        $('#holder').empty();
        $.ajax({ url: '/api/todo', method: 'GET' })
            .then(function (data) {
                let htmlstr = '';
                data.forEach(item => {
                    htmlstr += `<p class="todoitem">To Do: <b>${item.itemID}</b></p>`;
                    htmlstr += `<button data-id=${item.itemID} class="btn edit"><i class="fa fa-pencil-alt"></i></button>`;
                    htmlstr += `<button data-id=${item.itemID} class="btn delete"><i class="fa fa-times"></i></button>`;
                    htmlstr += `<br clear="all" />`;
                    htmlstr += `<div class="edit-box" id="${item.itemID}">`;
                    htmlstr += `</div>`;
                    htmlstr += `<hr />`;
                });
                $('#holder').html(htmlstr);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    $('.submit').on('click', function (event) {
        event.preventDefault();
        // Form Elements //
        const newToDo = {
            itemID: $('#item-id').val()
        };
        for (let key in newToDo) {
            if (newToDo[key] === '') {
                alert('Please Enter a To Do');
                return;
            }
        };
        $.ajax({ url: '/api/todo', method: 'POST', data: newToDo })
            .then(function (data) {
                if (data._id) {
                    $('#item-id').val('');
                    render();
                }
                else {
                    alert(`ERROR`);
                }
            });
    });

     // Delete Function //

     $('#holder').on('click', '.delete', function (event) {
        event.preventDefault();
        console.log('DELETE HELLO!!!');
        const itemID = $(this).data('id');
        console.log( itemID );
        const delID = { itemID: itemID };

        $.ajax({ url: `/api/todo/`, method: "DELETE", data: delID })
        .then(function () {
            render();
        });
    });

     // Edit Function //

    $('#holder').on('click', '.edit', function (event) {
        console.log('EDIT HELLO!!!');
        event.preventDefault();
        const itemID = $(this).data('id');
        let htmlstr = '';
        htmlstr += `<div class="input-group">`;
        htmlstr += `<input type="text" class="form-control" placeholder="Edit To Do" data-id="${itemID}">`;
        htmlstr += `<div class="input-group-append">`;
        htmlstr += `<button class="btn btn-outline-secondary" type="button" id="invsubmit" data-id="${itemID}">Update</button>`;
        htmlstr += `</div></div>`;

        $(`#${itemID}`).html(htmlstr);
    });

    $('#holder').on('click', '#invsubmit', function (event) {
        const itemID = $(this).data('id');
        const newID = $(`input[id="${itemID}"]`).val();
        const dataToSend = {
            itemID: itemID,
            newID: newID
        };
        $.ajax({ url: '/api/todo', method: 'PUT', data: dataToSend })
            .then(function (data) {
                render();
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    render();

});