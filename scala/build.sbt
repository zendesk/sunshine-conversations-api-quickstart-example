name := "smooch-quickstart"
version := "1.0"
scalaVersion := "2.11.8"

resolvers ++= Seq(
  "Smooch Bintray Repo" at "http://dl.bintray.com/smoochorg/maven"
)

libraryDependencies += "com.tumblr" %% "colossus" % "0.8.4"
libraryDependencies += "io.smooch" % "api" % "1.12.0"
libraryDependencies += "io.jsonwebtoken" % "jjwt" % "0.7.0"
