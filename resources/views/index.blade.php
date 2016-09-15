<!DOCTYPE html>
<!--suppress HtmlUnknownTarget -->
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Control panel</title>
        <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>
    <div id="app"></div>
    <form id="logout-form" action="/logout" method="POST" style="">
        {{ csrf_field() }}
    </form>
    <input type="hidden" id="csrf_token" value="{{csrf_token()}}">
    <script src="/js/app.js"></script>
    </body>
</html>