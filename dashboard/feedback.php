<?php
require_once "server/config.php";
$name = $comment = $fun = $learning = $activity = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $input_name = trim($_POST["name"]);
    $name = $input_name;

    $input_fun = trim($_POST["fun"]);
    $fun = $input_fun;

    $input_learning = trim($_POST["learning"]);
    $learning = $input_learning;

    $input_comment = trim($_POST["comment"]);
    $comment = $input_comment;

    $input_activity = trim($_POST["activity"]);
    $activity = $input_activity;

    if(true){
        $sql = "INSERT INTO feedback (name, fun, learning, comment, activity) VALUES (?, ?, ?, ?, ?)";

        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "siiss", $param_name, $param_fun, $param_learning, $param_comment, $param_activity);

            $param_name = $name;
            $param_comment = $comment;
            $param_fun = $fun;
            $param_learning = $learning;
            $param_activity = $activity;

            if(mysqli_stmt_execute($stmt)){
                header("location: index.php");
                exit();
            } else{
                echo "Erro ao tentar se comunicar com o servidor";
            }
        }
        mysqli_stmt_close($stmt);
    }
    mysqli_close($link);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="lib/css/bootstrap.min.css">
    <link rel="stylesheet" href="lib/css/bootstrap.min.css.map">
    <title>Feedback</title>
    <style type="comment/css">
        .wrapper{
            width: 500px;
            margin: 0 auto;
        }
        .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #f5f5f5;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="index.php"><img src="assets/owl.png" alt=""> Heraclitus</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="">|</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Atividades</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">|</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="feedback.php">Dar Feedback (Acesso dos Pais)</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">|</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="about.php">Sobre a Equipe</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="">|</a>
                </li>
          </div>
        </div>
      </nav>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="page-header">
                    <h2>Dar feedback em uma atividade</h2>
                </div>
                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                    <div class="form-group">
                        <label>Nome da criança</label>
                        <input type="text" name="name" class="form-control" value="">
                    </div>
                    <div class="form-group">
                        <label>Atividade</label>
                        <select name="activity" class="custom-select">
                            <option value="game">Voando com o Johnny (Jogo)</option>
                            <option value="educational">ABC do Johnny (Atividade Educacional)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>De 0 a 10, o quão divertida a atividade foi para a criança?</label>
                        <select name="fun" class="custom-select">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>De 0 a 10, o quão educativa a atividade foi para a criança?</label>
                        <select name="learning" class="custom-select">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Deixe um comentário</label>
                        <textarea name="comment" class="form-control" cols="10" rows="5"></textarea>
                    </div>
                    <input type="submit" class="btn btn-success" value="Enviar">
                    <a href="index.php" class="btn btn-secondary">Voltar para Atividades</a>
                </form>
            </div>
        </div>
    </div>
</body>
<script src="lib/js/jquery-3.5.1.min.js"></script>
    <script src="lib/js/bootstrap.bundle.min.js"></script>
    <script src="lib/js/bootstrap.bundle.min.js"></script>
</html>