//Esto le dice a Apollo donde encontrar nuestra API backend (que en este caso es la de SpaceX)
module.exports = {
    client: {
        service: {
            name: 'angular-spacex-graphql-codegen',
            url:'https://api.spacex.land/graphql/'
        }
    }
};