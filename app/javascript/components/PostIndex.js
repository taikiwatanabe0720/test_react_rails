import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PostIndex = (props) => {
  const [posts, setPosts] = useState([]);
  const [uiVisible, setUiVisible] = useState("");

  const handleState = (str) => {
    setUiVisible(str)
  }
  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/posts.json", {headers: {"content-type": "application/json"}})
    setPosts(res.data)
  }

  const postData = async () => {
    const res = await axios.post(
      "http://localhost:3000/posts",
      {"title": "aaaaa", "content": "bbbbb"},
      {"headers": {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      }
    )
    console.log("============", JSON.stringify(res))
  }

  useEffect(() => {
    setPosts(props.posts);
  }, [])

  return (
    <React.Fragment>
      <button onClick={() => fetchData()}>fetchボタン</button>
      <button onClick={() => postData()}>postボタン</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th colSpan="3"></th>
          </tr>
        </thead>

        <tbody>
          { posts.map((post) => (
            <tr>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>{'Show'}</td>
              <td>{'Edit'}</td>
              <td>{'Destroy'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default PostIndex
