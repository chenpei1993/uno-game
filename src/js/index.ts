import {Container} from "./Container";

const config = {
    resourceUrl: "http://127.0.0.1:8080/assets/img/",
    imageUrls: [
        "Table_0.png","Table_1.png","Table_2.png","Table_3.png","Table_4.png"
    ]
}
Container.create(document.getElementById("my-game"), config)
    .run()