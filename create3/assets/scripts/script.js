var appid = "0631934e";
var appkey = "bb134db29440aa5047d2e10211941e4e";
var zoekDitRecept ='';
var veggie =  "";
var pesc = "";
var randomrecipe;
$(document).ready(function(){
    //zoekDitRecept = $('input:text').val();
    randomrecipe = parseInt(Math.random()*10);
    doCall();
});

function doCall(){
    $.ajax({
        type: "GET",
        url: "https://api.yummly.com/v1/api/recipes?_app_id="+appid+"&_app_key="+appkey+"&q="+zoekDitRecept+veggie+pesc,
        success: function (res) {
           $.ajax({
               type: "GET",
               url: "https://api.yummly.com/v1/api/recipe/"+res.matches[randomrecipe].id+"?_app_id="+appid+"&_app_key="+appkey,
               success: function (response) {
                    $('.jumbotronText h1').html(response.name);
                    $(".divspan figure #cook>span" ).html(response.totalTimeInSeconds/60 + " Minutes");
                    $('.jumbotron>figure>img').attr("src",response.images[0].hostedLargeUrl);
                    $('.ingredient-list').empty();
                    for(var i in response.ingredientLines){
                        $('.ingredient-list').append("<li>" + response.ingredientLines[i] + "</li>");
                    }
                    if(response.nutritionEstimates.length == 0){
                        $(".divspan #hidecal").hide();
                    } else{
                        $(".divspan figure #cal>span").html(response.nutritionEstimates[randomrecipe].value + " CALORIES");
                    }
                    $(".divspan #serves>span").html(response.numberOfServings);
                    $("#recipelink").html("<a target='_blank' href='"+response.source.sourceRecipeUrl+"'>Bekijk origineel recept</a>");
               }
           });

           }
       });
}
$("#veggie").on("click", function(){
    if(this.checked){
        veggie = "&allowedDiet[]=386^Vegan";
    } else {
        veggie = "";
    }
    doCall();
});
$("#pesc").on("click", function(){
    if(this.checked){
        pesc = "&allowedDiet[]=390^Pescetarian";
    } else {
        pesc = "";
    }
    doCall();
});

$(".show-more a").on("click", function() {
    var $this = $(this);
    var $content = $this.parent().prev("div.content");
    var linkText = $this.text().toUpperCase();

    if(linkText === "SHOW MORE"){
        linkText = "Show less";
        $("#recipe").show(200);
    } else {
        linkText = "Show more";
        $("#recipe").hide(200);
    }

    $this.text(linkText);
});
