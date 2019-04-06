$(document).ready(function() {
  $.ajax({
    url: "/questions/" + localStorage.getItem('userName'),
    async: false,
    success: function(result) {
      //$("div").html(result);
      console.log(result);
      if(result.length > 0){
        result.forEach(question => {
          $('#questions').append(
            `<div class="card addMargin">
              <div class="card-body">
              <h5 class="card-title">${question.question}</h5>
              <p class="card-text">${question.option1}</p>
              <p class="card-text">${question.option2}</p>
              <p class="card-text">${question.option3}</p>
              <p class="card-text">${question.option4}</p>
            </div>
          </div>`
          );  
        });
      }
    },
    error: function(e){
      $('#questions').append(`
        <div class="card addMargin">
              <div class="card-body">
              <h5 class="card-title">User has no questions</h5>
            </div>
          </div>
        `);
    }
  });

  if (!localStorage.getItem("userName")) {
    $(location).attr("href", "/");
  }

  $("#logout").click(function(){
    localStorage.clear();
    $(location).attr("href", "/");
  });


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
      userId: localStorage.getItem('userName'),
      question: $("input[name=question]").val(),
      option1: $("input[name=op1]").val(),
      option2: $("input[name=op2]").val(),
      option3: $("input[name=op3]").val(),
      option4: $("input[name=op4]").val()

    };

    // process the form
    $.ajax({
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "createQuestion", // the url where we want to POST
      data: formData, // our data object
      dataType: "json", // what type of data do we expect back from the server
      encode: true
    })
      // using the done promise callback
      .done(function(data) {
        // log data to the console so we can see
        //localStorage.setItem("userName", data._id);
        //console.log(localStorage.getItem("userName"));
        window.location.replace("/userhome.html");
        // here we will handle errors and validation messages
      });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
});
