let socket = io();
let select = jQuery('#dropdown');

function forEach(array, callback, scope) {
	for (let i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]);
    }
}

socket.on('updateRoomList', function(rooms) {
    forEach(rooms, function(i, room) {
        select.append(jQuery(`<option>${room}</option>`));
    });

    if (select.children().length > 1) {
        jQuery('#select-room').removeClass('select-hide');
    }
    console.log(rooms);
});

select.on('change', function() {
    let room = jQuery(this).find('option:selected').val();

    if (room !== 'Select a room') {
        jQuery('input[name=room]').val(room);
    }
});