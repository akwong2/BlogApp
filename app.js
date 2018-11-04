let bodyParser  = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express()


// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/ MODEL CONFIG
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
let Blog = mongoose.model("Blog", blogSchema)

// RESTFUL ROUTES

app.get("/", function(req, res) {
  res.redirect("/blogs");
})

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) console.log("err")
    else {
      res.render("index", {blogs, blogs})
    }
  })
})



app.listen(process.env.PORT, process.env.IP, function() {
  console.log("RESTfulBlogApp Server has started");
});
