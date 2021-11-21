
example.dot requires the use of [GraphViz](https://graphviz.org/).

To install run the command,

```bash
sudo apt install graphviz
```

Once [GraphViz](https://graphviz.org/) is installed, run the command,

```bash
dot example.dot -Tpdf > graph.pdf
```

To print output of C program graph without using `make vis`

```bash
./main | dot -Tpdf > vis.pdf
```

Had to use the command below to reset vscode personal access token,

```bash
git remote set-url origin https://username:token@github.com/username/repository.git
```