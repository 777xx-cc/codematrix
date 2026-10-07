import { runCode } from './src/utils/runner'

const tests: { lang: any; name: string; code: string; expect: string }[] = [
  {
    lang: 'java', name: 'java-e22 素数计数',
    code: `public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int n = 2; n <= 100; n++) {
            boolean isPrime = true;
            for (int i = 2; i < n; i++) {
                if (n % i == 0) { isPrime = false; }
            }
            if (isPrime) count++;
        }
        System.out.println("count = " + count);
    }
}`,
    expect: 'count = 25\n',
  },
  {
    lang: 'java', name: 'java-e23 直角三角形',
    code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
}`,
    expect: '*\n**\n***\n****\n*****\n',
  },
  {
    lang: 'java', name: 'java-e24 平均分统计',
    code: `public class Main {
    public static void main(String[] args) {
        int[] scores = {78, 92, 65, 88, 54, 90};
        int sum = 0;
        for (int i = 0; i < scores.length; i++) sum += scores[i];
        int avg = sum / scores.length;
        int count = 0;
        for (int i = 0; i < scores.length; i++) {
            if (scores[i] > avg) count++;
        }
        System.out.println("avg = " + avg);
        System.out.println("above = " + count);
    }
}`,
    expect: 'avg = 77\nabove = 4\n',
  },
  {
    lang: 'cpp', name: 'cpp-e22 等腰三角形',
    code: `#include <iostream>
using namespace std;
int main() {
    int n = 4;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n - i; j++) cout << " ";
        for (int j = 0; j < 2 * i - 1; j++) cout << "*";
        cout << endl;
    }
    return 0;
}`,
    expect: '   *\n  ***\n *****\n*******\n',
  },
  {
    lang: 'cpp', name: 'cpp-e23 第二大数',
    code: `#include <iostream>
using namespace std;
int main() {
    int a[] = {3, 9, 1, 9, 5, 7};
    int first = -1000000, second = -1000000;
    for (int i = 0; i < 6; i++) {
        if (a[i] > first) {
            second = first;
            first = a[i];
        } else if (a[i] > second && a[i] < first) {
            second = a[i];
        }
    }
    cout << "second = " << second << endl;
    return 0;
}`,
    expect: 'second = 7\n',
  },
  {
    lang: 'cpp', name: 'cpp-e24 字符分类统计',
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "Hello2024Cpp";
    int upper = 0, lower = 0, digit = 0;
    for (int i = 0; i < s.length(); i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') upper++;
        else if (s[i] >= 'a' && s[i] <= 'z') lower++;
        else if (s[i] >= '0' && s[i] <= '9') digit++;
    }
    cout << "upper = " << upper << endl;
    cout << "lower = " << lower << endl;
    cout << "digit = " << digit << endl;
    return 0;
}`,
    expect: 'upper = 2\nlower = 6\ndigit = 4\n',
  },
  {
    lang: 'c', name: 'c-e22 水仙花数',
    code: `#include <stdio.h>
int main() {
    int first = 1;
    for (int n = 100; n <= 999; n++) {
        int a = n / 100, b = n / 10 % 10, c = n % 10;
        if (a*a*a + b*b*b + c*c*c == n) {
            if (!first) printf(" ");
            printf("%d", n);
            first = 0;
        }
    }
    printf("\\n");
    return 0;
}`,
    expect: '153 370 371 407\n',
  },
  {
    lang: 'c', name: 'c-e24 成绩统计',
    code: `#include <stdio.h>
int main() {
    int scores[] = {78, 92, 65, 88, 54, 90};
    int n = 6;
    int max = scores[0], min = scores[0], sum = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] > max) max = scores[i];
        if (scores[i] < min) min = scores[i];
        sum += scores[i];
    }
    printf("max = %d\\n", max);
    printf("min = %d\\n", min);
    printf("avg = %d\\n", sum / n);
    return 0;
}`,
    expect: 'max = 92\nmin = 54\navg = 77\n',
  },
  // ---- 回归用例：覆盖 splitStatements / if-else 改动影响面 ----
  {
    lang: 'java', name: '回归: Java 全花括号 if-else if-else',
    code: `public class Main {
    public static void main(String[] args) {
        int x = 7;
        if (x > 10) {
            System.out.println("big");
        } else if (x > 5) {
            System.out.println("mid");
        } else {
            System.out.println("small");
        }
    }
}`,
    expect: 'mid\n',
  },
  {
    lang: 'java', name: '回归: Java while + charAt + 字符串拼接',
    code: `public class Main {
    public static void main(String[] args) {
        String s = "abc";
        int i = 0;
        String out = "";
        while (i < s.length()) {
            out = out + s.charAt(i);
            i++;
        }
        System.out.println(out);
    }
}`,
    expect: 'abc\n',
  },
  {
    lang: 'java', name: '回归: Java 无花括号 if-else 双分支',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 3, b = 9;
        if (a > b) System.out.println("a");
        else System.out.println("b");
        int max = 0;
        if (a > b) max = a; else max = b;
        System.out.println(max);
    }
}`,
    expect: 'b\n9\n',
  },
  {
    lang: 'cpp', name: '回归: C++ else 后无花括号 + 嵌套 if',
    code: `#include <iostream>
using namespace std;
int main() {
    int n = 5;
    if (n % 2 == 0) cout << "even" << endl;
    else cout << "odd" << endl;
    for (int i = 0; i < 3; i++) {
        if (i == 1) cout << "one" << endl;
        else cout << i << endl;
    }
    return 0;
}`,
    expect: 'odd\n0\none\n2\n',
  },
  {
    lang: 'c', name: '回归: C 字符数组与 printf 格式',
    code: `#include <stdio.h>
int main() {
    char s[] = "Hi";
    printf("%c%c %s\\n", s[0], s[1], s);
    double avg = 10.0 / 4;
    printf("%.2f\\n", avg);
    return 0;
}`,
    expect: 'Hi Hi\n2.50\n',
  },
  {
    lang: 'c', name: '回归: C 无花括号 if-else if-else 链',
    code: `#include <stdio.h>
int main() {
    int score = 85;
    if (score >= 90) printf("A\\n");
    else if (score >= 80) printf("B\\n");
    else if (score >= 60) printf("C\\n");
    else printf("D\\n");
    return 0;
}`,
    expect: 'B\n',
  },
  {
    lang: 'java', name: '回归: Java Math.sqrt 与累乘',
    code: `public class Main {
    public static void main(String[] args) {
        int p = 1;
        for (int i = 1; i <= 5; i++) p *= i;
        System.out.println(p);
        System.out.println((int) Math.sqrt(16));
    }
}`,
    expect: '120\n4\n',
  },
]

async function main() {
  let pass = 0, fail = 0
  for (const t of tests) {
    const r = await runCode(t.lang, t.code)
    const ok = !r.error && r.output === t.expect
    if (ok) { pass++; console.log(`PASS  ${t.name}`) }
    else {
      fail++
      console.log(`FAIL  ${t.name}`)
      console.log(`  期望: ${JSON.stringify(t.expect)}`)
      console.log(`  实际: ${JSON.stringify(r.output)}  err: ${r.error ?? '无'}`)
    }
  }
  console.log(`\n${pass} 通过, ${fail} 失败`)
  if (fail > 0) process.exit(1)
}

main().catch(e => { console.error(e); process.exit(1) })
