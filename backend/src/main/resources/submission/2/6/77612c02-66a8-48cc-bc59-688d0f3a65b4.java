import java.util.Scanner;

public class GridMaximumSum {
  public static void main(String[] args) {
    GridMaximumSum T = new GridMaximumSum();
    Scanner kb = new Scanner(System.in);
    int n = kb.nextInt();
    int[][] arr = new int[n][n];
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        arr[i][j] = kb.nextInt();
      }
    }
    System.out.println(T.solution(arr, n));
  }

  // 해결방법
  // 입력받은 행렬에서 행의 값을 더한 값, 열의 값을 더한 값, 대각선을 더한 값을 비교
  // 가장 큰 것을 출력
  public int solution(int[][] arr, int n) {
    int answer = 0;
    int sum1, sum2;
    for (int i = 0; i < n; i++) {
      sum1 = sum2 = 0; // 합을 초기화
      for (int j = 0; j < n; j++) {
        sum1 += arr[i][j]; // 같은 행에 있는 값의 합
        sum2 += arr[j][i]; // 같은 열에 있는 값의 합
      }
      // 더 큰 값 집어넣기
      answer = Math.max(answer, sum1);
      answer = Math.max(answer, sum2);
    }
    sum1 = sum2 = 0;
    for (int i = 0; i < n; i++) {
      sum1 += arr[i][i]; // 왼쪽 위에서 오른쪽 아래로 대각선의 합
      sum2 += arr[i][n - i - 1]; // 왼쪽 아래에서 오른쪽 위로 대각선의 합
    }
    answer = Math.max(answer, sum1);
    answer = Math.max(answer, sum2);

    return answer;
  }
}