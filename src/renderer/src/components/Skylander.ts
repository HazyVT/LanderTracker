
class Skylander {
    id: number;
    name: string;
    type: string;
    game: string;
    link: string;
    obtained: boolean;

    constructor(id: number, name: string, type: string, game: string, link: string, obtained: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.game = game;
        this.link = link;
        this.obtained = obtained;
    }

}

export default Skylander;