import {Container} from "./Container";

const unoConfig = {
    resourceUrl: "http://127.0.0.1:8080/assets/img/",
    imageUrls: [
        "Table_0.png","Table_1.png","Table_2.png","Table_3.png","Table_4.png","Deck.png",
        "card/Blue_0.png","card/Blue_1.png","card/Blue_2.png","card/Blue_3.png","card/Blue_4.png","card/Blue_5.png","card/Blue_6.png","card/Blue_7.png","card/Blue_8.png","card/Blue_9.png","card/Blue_Draw.png","card/Blue_Reverse.png","card/Blue_Skip.png",
        "card/Red_0.png","card/Red_1.png","card/Red_2.png","card/Red_3.png","card/Red_4.png","card/Red_5.png","card/Red_6.png","card/Red_7.png","card/Red_8.png","card/Red_9.png","card/Red_Draw.png","card/Red_Reverse.png","card/Red_Skip.png",
        "card/Yellow_0.png","card/Yellow_1.png","card/Yellow_2.png","card/Yellow_3.png","card/Yellow_4.png","card/Yellow_5.png","card/Yellow_6.png","card/Yellow_7.png","card/Yellow_8.png","card/Yellow_9.png","card/Yellow_Draw.png","card/Yellow_Reverse.png","card/Yellow_Skip.png",
        "card/Green_0.png","card/Green_1.png","card/Green_2.png","card/Green_3.png","card/Green_4.png","card/Green_5.png","card/Green_6.png","card/Green_7.png","card/Green_8.png","card/Green_9.png","card/Green_Draw.png","card/Green_Reverse.png","card/Green_Skip.png",
        "card/Wild_Color.png","card/Wild_Draw.png",
    ]
}
Container.create(document.getElementById("my-game"), unoConfig)
    .run()