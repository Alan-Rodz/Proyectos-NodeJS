//Bring in moment to format dates
const moment = require("moment");

//Bunch of functions that will help us in other files
module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format);
    },

    //This function takes the string and how long we want it to be, then adds '...' at the end of it
    //It is used so that all stories are shown as having the same length
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = new_str.length > 0 ? new_str : str.substr(0, len);
            return new_str + "...";
        }
        return str;
    },

    //This function replaces anything with angle brackets and replaces it with nothing
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, "");
    },

    //This function allows us to make sure a user can edit his or her own stories
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
            } else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
            }
        } else {
            return "";
        }
    },

    //This functions makes it so that when we edit a story, its status appears as that which was selected when we made it
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp(">" + selected + "</option>"),
                ' selected="selected"$&'
            );
    },
};
