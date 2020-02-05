(function () {
    //CSV with header, everything is fine
    d3.csv('./data.csv').then(data => {
        const blocks = d3.select('#default')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .append('pre')
            .append('code')
            .attr('class', 'hjls json')
            .text((d, i) => formatJson(d, i, data.length));

        blocks.nodes().forEach(block => hljs.highlightBlock(block));
    });

    //CSV without header, funkey things happen
    d3.csv('./data_no_headers.csv').then(data => {
        const blocks = d3.select('#wrong')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .append('pre')
            .append('code')
            .attr('class', 'hjls json')
            .text((d, i) => formatJson(d, i, data.length));

        blocks.nodes().forEach(block => hljs.highlightBlock(block));
    });

    //CSV without header workaround
    d3.text('./data_no_headers.csv').then(text => {
        const data = d3.csvParseRows(text, row => {
            return {
                'name': row[0],
                'age': row[1],
                'height': row[2]
            }
        });
        const blocks = d3.select('#alternative')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .append('pre')
            .append('code')
            .attr('class', 'hjls json')
            .text((d, i) => formatJson(d, i, data.length));

        blocks.nodes().forEach(block => hljs.highlightBlock(block));
    });

    function formatJson(d, i, length) {
        const suffix = i === length - 1 ? '': ',';
        const json = JSON.stringify(d,  null, 2);
        return `${json}${suffix}`;
    }
})();
