$(document).ready(function() {
  $.ajax({
    url: "/questions",
    async: false,
    success: function(result) {
      console.log(result);
      if (result.length > 0) {
        result.forEach(question => {
          $("#survey").append(
            `
            <div class="container">
            <div class="row">
              <div class="col-sm-2"></div>
              <div class="col-sm-8">
                <h4>${
                  question.question
                  }</h4>
              </div>
              <div class="col-sm-2"></div>
            </div>
            <div class="row">
              <div class="col-sm-2"></div>
              <div class="col-sm-8">
                <div class="input-group">
                  <select id="${question._id}" class="custom-select" id="inputGroupSelect04" aria-label="">
                    <option selected >Choose...</option>
                    <option value="${question.option1}">${question.option1}</option>
                    <option value="${question.option2}">${question.option2}</option>
                    <option value="${question.option3}">${question.option3}</option>
                    <option value="${question.option4}">${question.option4}</option>
                  </select>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" id="vote" onclick="{vote('${question._id}')}" type="button">Vote</button>
                  </div>
                </div>
              </div>
              <div class="col-sm-2"></div>
            </div>
            `
          );
        });
      }
    },
    error: function(e) {
      $("#questions").append(`
        <div class="card addMargin">
              <div class="card-body">
              <h5 class="card-title">No User has posted any questions, please login to add questions</h5>
            </div>
          </div>
        `);
    }
  });

  if (!localStorage.getItem("userName")) {
    $(location).attr("href", "/");
  }

  $("#logout").click(function() {
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
      userId: localStorage.getItem("userName"),
      question: $("input[name=question]").val(),
      option1: $("input[name=op1]").val(),
      option2: $("input[name=op2]").val(),
      option3: $("input[name=op3]").val(),
      option4: $("input[name=op4]").val()
    };
});
});

function vote(e) {
  if($("#"+ e).val() == 'Choose...'){
    alert('Please choose your answer.')
  }
      // there are many ways to get this data using jQuery (you can use the class or id also)
      var formData = {
        userId: localStorage.getItem("userName"),
        question: e,
        optionSelected: $("#"+ e).val()
      };
  
      // process the form
      $.ajax({
        type: "POST", // define the type of HTTP verb we want to use (POST for our form)
        url: "createSurvey", // the url where we want to POST
        data: formData, // our data object
        dataType: "json", // what type of data do we expect back from the server
        encode: true
      })
        // using the done promise callback
        .done(function(data) {
          // log data to the console so we can see
          //localStorage.setItem("userName", data._id);
          //console.log(localStorage.getItem("userName"));
          window.location.replace("/survey.html");
          // here we will handle errors and validation messages
        });
  
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
}