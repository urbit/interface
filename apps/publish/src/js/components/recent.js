import React, { Component } from 'react';
import classnames from 'classnames';
import { PostPreview } from '/components/post-preview';


export class Recent extends Component {
  constructor(props){
    super(props)
    console.log("recent props", props);
  }

  buildRecent() {
    var recent = [];
    var group = {
      date: new Date(), 
      posts: [],
    };

    for (var i=0; i<this.props.latest.length; i++) {
      let index = this.props.latest[i];
      let post = this.retrievePost(index.post, index.coll, index.who);
      let postDate = new Date(post.info["date-created"]);
      let postProps = this.buildPostPreviewProps(index.post, index.coll, index.who);

      if (group.posts.length == 0) {
        group = {
          date: this.roundDay(postDate),
          posts: [postProps],
        }

        if (i == (this.props.latest.length - 1)) {
          recent.push(Object.assign({}, group));
        }

      } else if ( this.sameDay(group.date, postDate) ) {
        group.posts.push(postProps) ;
      } else {
        recent.push(Object.assign({}, group));

        group = {
          date: this.roundDay(postDate),
          posts: [postProps],
        }

        if (i == (this.props.latest.length - 1)) {
          recent.push(Object.assign({}, group));
        }

      }
    }
    return recent;
  }

  buildPostPreviewProps(post, coll, who){
    let pos = this.retrievePost(post, coll, who);
    let col = this.retrieveColl(coll, who);
    let com = this.retrieveComments(post, coll, who);

    return {
      postTitle: pos.info.title,
      postName:  post,
      postSnippet: "body snippet",
      numComments: com.length,
      collectionTitle: col.title,
      collectionName:  coll,
      author: who,
      date: pos.info["date-created"]
    }

  }


  retrievePost(post, coll, who) {
    if (who === window.ship) {
      return this.props.pubs[coll].posts[post].post;
    } else {
      return this.props.subs[who][coll].posts[post].post;
    }
  }

  retrieveComments(post, coll, who) {
    if (who === window.ship) {
      return this.props.pubs[coll].posts[post].comments;
    } else {
      return this.props.subs[who][coll].posts[post].comments;
    }
  }

  retrieveColl(coll, who) {
    if (who === window.ship) {
      return this.props.pubs[coll].info;
    } else {
      return this.props.subs[who][coll].info;
    }
  }



  roundDay(d) {
    let result = new Date(d.getTime());
    result.setHours(0);
    result.setMinutes(0);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result
  }

  sameDay(d1, d2) {
    return d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate() &&
      d1.getFullYear() === d2.getFullYear();
  }

  dateLabel(d) {
    let today = new Date();

    console.log("today", today);

    let yesterday = new Date(today.getTime() - (1000*60*60*24));
    if (this.sameDay(d, today)) {
      return "Today";
    } else if (this.sameDay(d, yesterday)) {
      return "Yesterday";
    } else if ( d.getFullYear() === today.getFullYear() ) {
      let month = d.toLocaleString('en-us', {month: 'long'});
      let day = d.getDate();
      return month + ' ' + day;
    } else {
      let month = d.toLocaleString('en-us', {month: 'long'});
      let day = d.getDate();
      let year = d.getFullYear();
      return month + ' ' + day + ' ' + year;
    }
  }


  render() {
    let recent = this.buildRecent();

    console.log("recent", recent);


    let body = recent.map((group) => {
      let posts = group.posts.map((post) => {
        return (
          <PostPreview
            post={post}
          />
        );
      });
      let date = this.dateLabel(group.date);
      return (
        <div>
          <div className="w-100 h-80">
            <h2 className="gray-50">
              {date}
            </h2>
          </div>
          <div className="flex flex-wrap">
            {posts} 
          </div>
        </div>
      );
    });


    return (
      <div className="flex-col">
        {body} 
      </div>
    );
  }
}
