const bcrypt = require("bcrypt");

data = "test";
hash = "$2b$10$AhjT1K/27Mmgyesc3UufW.B24mM/ovSs56m9vdnxJ6OwBfS/TEiRa";

bcrypt.compare(data, hash).then(function (result) {
	console.log(result);
});
