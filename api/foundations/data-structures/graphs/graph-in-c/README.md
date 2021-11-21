
example.dot requires the use of [GraphViz](https://graphviz.org/).

To install run the command,

```bash
sudo apt install graphviz
```

Once [GraphViz](https://graphviz.org/) is installed, run the command,

```bash
dot example.dot -Tpdf > graph.pdf
```

**NOTE** The Makefile is not working too well.

To print output of C program graph

```bash
./main | dot -Tpdf > vis.pdf
```