$(document).ready(function() {
  if (localStorage.getItem("userName")) {
//    $(location).attr("href", "/userhome.html");
  }

  $("input").blur(function() {
    var $this = $(this);
    if ($this.val()) $this.addClass("used");
    else $this.removeClass("used");
  });

  var $ripples = $(".ripples");

  $ripples.on("click.Ripples", function(e) {
    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find(".ripplesCircle");

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + "px",
      left: x + "px"
    });

    $this.addClass("is-active");
  });

  $ripples.on(
    "animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd",
    function(e) {
      $(this).removeClass("is-active");
    }
  );

  // process the form
  $("form").submit(function(event) {
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
      userName: $("input[name=userName]").val(),
      password: $("input[name=password]").val(),
      email: $("input[name=email]").val()
    };

    // process the form
    $.ajax({
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "signup", // the url where we want to POST
      data: formData, // our data object
      dataType: "json", // what type of data do we expect back from the server
      encode: true
    })
      // using the done promise callback
      .done(function(data) {
        // log data to the console so we can see
        localStorage.setItem("userName", data._id);
        console.log(localStorage.getItem("userName"));
        window.location.replace("/userhome.html");
        // here we will handle errors and validation messages
      });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
});
