export default function CheckDifficulty() {
  return (
    <div className="container mt-2">
      <table>
        <thead>
          <tr>
            <th>Task Difficulty</th>
            <th>DC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Very Easy</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Easy</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Medium</td>
            <td>15</td>
          </tr>
          <tr>
            <td>Hard</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Very Hard</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Nearly impossible</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}