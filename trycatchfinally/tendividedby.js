function main(args) {

    if(!args.input) args.input = 0;

    if(args.input === 0) {
        throw new Error("Can't divide by zero and maintain the Universe.");
    }

    return { result: 10/args.input };

}