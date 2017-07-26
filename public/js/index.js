let socket = io();

function forEach(array, callback) {
	for (let i = 0; i < array.length; i++) {
		callback(array[i]);
    }
}

socket.on('updateRoomList', function(rooms) {
    
// 27/7
// select must modify first then change can take place,
// io.emit so that the update message can reach index.html and not to room socket
// ioemit at disconnect, upon connect and after add user
// rebuild the instance everytime fx is call and put the instance at other div that can easily be clear..
// can add or remove class

if (rooms.length > 0) {

    jQuery('#select-room').removeClass('select-hide');
    var select = jQuery("<select id='dropdown'></select>");
    select.append(jQuery("<option>Select an option</option>"));
    // var select = jQuery("#dropdown");

    rooms.forEach((room)=>{
        select.append(jQuery(`<option>${room}</option>`));
    });

    jQuery('#select-dropdown').html(select);

    select.on('change', function() {
    let room = jQuery(this).find('option:selected').val();
    console.log(room);

    if (room !== 'Select a room') {
        jQuery('input[name=room]').val(room);
    }
});
}  else {
    jQuery('#select-dropdown').html('');
    jQuery('input[name=room]').val('');
    jQuery('#select-room').addClass('select-hide');
}


});


