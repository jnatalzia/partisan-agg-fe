ps x | grep "[n]ode partisan-agg-fe.js" | awk '
{ 
  if($1!="") {
      print "killing front end: "$1
      system("kill " $1)
  }
}' 

