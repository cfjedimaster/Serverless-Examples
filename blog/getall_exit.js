function main(args) {

    console.log(args.rows);
    let result = args.rows.map( (item) => {
        return {
            "title":item.doc.title,
            "body":item.doc.body,
            "slug":item.doc.slug,
            "published":item.doc.published
        }
    });

    return { results:result }

}