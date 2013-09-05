/*
BOHEMIANGRID OPTIONS
Options for vendor scripts
 */

// End Pull to Refresh

// Start Multiple Choice
$( "input[name='option']" ).bind( "click", selectOption )

  function selectOption()
  {
    if ($(this).val() == 'Other') {
        $('div#other-field').fadeIn();
    }
    else {
        $('div#other-field').fadeOut();
    }

    var optionValue = $(this).val(); // Variable to get value
    $('textarea#log').html(optionValue+'&nbsp;'); // Append to log.
  }

  $("input#submit").click(function () {
    $('textarea#log').html($('input#myInput').val());
  });
// End Multiple Choice

