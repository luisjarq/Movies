
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://user:bSYl6bjkn3a2QSJ8@clusterdev.eyutr.mongodb.net/movies?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(url);

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));