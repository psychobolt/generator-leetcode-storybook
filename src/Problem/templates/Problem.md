# [<%= title %>](<%= url %>)

| Category | Difficulty | Likes | Dislikes |
| :------: | :--------: | :---: | :------: |
| <%= category %> | <%= difficulty %> | <%= likes %> | <%= dislikes %> |

<details>
  <summary><strong>Tags</strong></summary>

  <%= tags.map(tag => `[${tag}](https://leetcode.com/tag/${tag})`).join(' | ') %>

</details>

<details>
  <summary><strong>Companies</strong></summary>

  <%= companies.join(' | ') %>
  
</details>
<br />
<%- body %>