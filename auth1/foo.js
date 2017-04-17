function main(args) {

    if(!args.name) args.name = 'Nameless';
    return {
        result:"Hello "+args.name
    }

}