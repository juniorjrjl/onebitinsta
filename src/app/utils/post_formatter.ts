import { Hashtag } from "../models/hashtag";
import { Post } from "../models/post";
import { User } from "../models/user";

export class PostFormatter {
 
    private constructor(){}
   
    public static call(post_data: any, included: any): Post {
      return PostFormatter.preparePostObject(post_data, included);
    }
   
    private static preparePostObject(post_data: any, included: any): Post {
      let post = post_data.attributes;
      post["owner"] = PostFormatter.includeUser(post_data.relationships.user.data, included);
      post["hashtags"] = PostFormatter.includeHashtags(post_data.relationships.hashtags.data, included);
      return new Post(post_data.id, post.photo_url, post.description, post.owner, post.hashtags, 
        { likeCount: post.like_count, isLiked: post.is_liked});
    }
   
   
    private static includeUser(user_data: any, included_data: any): User {
      let user = included_data.filter(included => included.type == "user" && included.id == user_data.id)[0];
      return new User(user.id, user.attributes.name, user.attributes.email, user.attributes.photo_url);
    }
   
   
    private static includeHashtags(post_hashtags: any, included_data: any): Hashtag {
      let hashtags_ids = post_hashtags.map(hashtags =>  hashtags.id);
      return included_data
        .filter(included => included.type == "hashtag" && this.isThereHashtagId(hashtags_ids, included.id))
        .map(hashtag => new Hashtag(hashtag.id, hashtag.attributes.name));
    }
   
   
    private static isThereHashtagId(hashtags, id): boolean {
      return hashtags.some(hashtag_id => hashtag_id == id);
    }
  }