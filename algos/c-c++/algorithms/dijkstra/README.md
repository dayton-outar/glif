# 8.3 Shortest Paths

Finding the shortest path is a classical problem in graph theory, and a large number of different solutions have been proposed. Edges are assigned certain weights representing, for example,

 - distances between cities
 - times separating the execution of certain tasks
 - costs of transmitting information between locations
 - amounts of some substance transported from one place to another,

and so on.

When determining the shortest path from vertex $v$ to vertex $u$, information about distances between intermediate vertices $w$ has to be recorded. This information can be recorded as a label associated with these vertices, where the label is only the distance from $v$ to $w$ or the distance along with the predecessor of $w$ in this path. The methods of finding the shortest path rely on these labels. Depending on how many times these labels are updated, the methods solving the shortest path problem are divided in two classes: _label-setting methods_ and _label-correcting methods_.

## Observations

