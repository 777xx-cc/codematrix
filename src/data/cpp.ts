import type { LanguagePack } from './types'

export const cpp: LanguagePack = {
  id: 'cpp',
  name: 'C++',
  zhName: 'C++',
  color: '#659ad2',
  gradient: 'from-blue-500 to-indigo-600',
  icon: '⚙️',
  tagline: '性能与抽象的黄金平衡',
  description: '在 C 之上加入面向对象与泛型编程，是游戏引擎、高频交易与系统软件的主力语言。',
  playgroundTemplate: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CodeMatrix!" << endl;
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    cout << "1+2+...+100 = " << sum << endl;
    return 0;
}`,
  chapters: [
    {
      id: 'cpp-ch1',
      title: '第 1 章 C++ 入门',
      intro: 'C++ 与 C 的关系、编译流程、iostream 输入输出。',
      sections: [
        {
          title: '1.1 从 C 到 C++',
          content: [
            'C++ 由 Bjarne Stroustrup 于 1980 年代在 C 基础上开发，最初叫"带类的 C"。它完全兼容 C 语法，并加入类、模板、异常、STL 等特性。',
            '编译流程：预处理（展开 #include 与宏）→ 编译（生成汇编）→ 汇编（生成目标文件 .o）→ 链接（生成可执行文件）。g++ main.cpp -o main 一步完成。',
            '源文件后缀通常是 .cpp，头文件 .h 或 .hpp。C++ 标准演进：C++98 → C++11（现代 C++ 起点：auto、Lambda、智能指针）→ C++14/17/20/23 持续增强。',
            'C++ 的设计哲学：零开销抽象（不用的特性不付代价）、信任程序员（给你足够自由的控制权）。',
          ],
          code: {
            lang: 'cpp',
            caption: '第一个 C++ 程序',
            source: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
          },
        },
        {
          title: '1.2 cin 与 cout',
          content: [
            'cout << 用于输出，<< 是插入运算符，可连续链式书写；endl 换行并刷新缓冲区（频繁用 endl 比 "\\n" 慢，大量输出时注意）。',
            'cin >> 用于输入，自动跳过空白字符。类型不匹配会进入失败状态，可用 cin.fail() 检测、cin.clear() 恢复。getline(cin, s) 读取整行（含空格）。',
            'using namespace std; 省去 std:: 前缀，但大型项目推荐显式写 std::cout，避免命名冲突——考试中两种写法都接受。',
            '格式化输出：<iomanip> 提供 setw(n) 设置宽度、setprecision(n) 控制精度、fixed 定点小数。如 cout << fixed << setprecision(2) << 3.14159 输出 3.14。',
          ],
        },
        {
          title: '1.3 命名空间与引用初步',
          content: [
            '命名空间 namespace 解决命名冲突：namespace A { int x; }，用 A::x 访问。:: 是作用域运算符，单独 ::x 表示访问全局变量。',
            '引用是变量的别名：int& r = a; 定义时必须初始化，之后对 r 的操作就是对 a 的操作。引用不能"改嫁"（不能改绑其他变量），也不存在空引用。',
            '引用与指针的区别速记：引用是"另一个名字"，指针是"存地址的变量"；引用必须初始化不可改绑，指针可以为空可以改指向；引用更安全，指针更灵活。',
          ],
        },
      ],
      quiz: [
        {
          question: 'C++ 编译流程的正确顺序是？',
          options: ['A. 编译→预处理→汇编→链接', 'B. 预处理→编译→汇编→链接', 'C. 预处理→汇编→编译→链接', 'D. 链接→编译→预处理→汇编'],
          answer: 'B',
          explanation: '预处理展开宏与头文件 → 编译生成汇编 → 汇编生成目标文件 → 链接成可执行文件。',
        },
        {
          question: 'cout << fixed << setprecision(2) << 3.14159 的输出是 ______。',
          answer: '3.14',
          explanation: 'fixed 定点 + setprecision(2) 保留两位小数（四舍五入），需 #include <iomanip>。',
        },
        {
          question: '关于引用，下列说法错误的是？',
          options: ['A. 定义时必须初始化', 'B. 可以重新绑定到其他变量', 'C. 是变量的别名', 'D. 可作为函数参数修改实参'],
          answer: 'B',
          explanation: '引用一旦绑定终身不改，后续"赋值"改的是被绑定变量的值而非重新绑定。',
        },
      ],
    },
    {
      id: 'cpp-ch2',
      title: '第 2 章 数据类型与运算',
      intro: '内置类型、类型转换、auto 与常量。',
      sections: [
        {
          title: '2.1 内置数据类型',
          content: [
            '整型：short(2 字节)、int(4)、long(4 或 8)、long long(8)，均可加 unsigned 前缀翻倍正数范围。浮点：float(4，约 7 位有效数字)、double(8，约 15 位)。',
            'sizeof 运算符返回类型或对象占的字节数：sizeof(int) 通常为 4。bool 占 1 字节，true/false 对应 1/0，可与整数互相转换（与 Java 不同）。',
            'auto 关键字让编译器推导类型：auto x = 3.14;（x 为 double），C++11 起支持，遍历容器时 auto& 尤其方便。',
            '字面量后缀：100L(long)、100U(unsigned)、3.14f(float)；前缀：0x 十六进制、0 开头八进制、0b 二进制（C++14）。',
          ],
        },
        {
          title: '2.2 类型转换与运算规则',
          content: [
            '隐式转换遵循"向大看齐"：int 与 double 混合运算时 int 先转 double。char 参与运算先提升为 int（用 ASCII 值参与）。',
            '显式转换：C 风格 (int)3.9；C++ 风格 static_cast<int>(3.9)，更安全、意图更明确，推荐使用。还有 const_cast、dynamic_cast、reinterpret_cast 三个专用转换。',
            '整数除法与 C 一致：7/2=3；要得小数至少一边为浮点：7/2.0=3.5。取余 % 只能用于整数。',
            '无符号陷阱：unsigned int 与 int 混合运算时 int 被转成 unsigned，-1 会变成 4294967295！比较循环下标时慎用 unsigned。',
          ],
        },
        {
          title: '2.3 常量与 constexpr',
          content: [
            'const 常量：const double PI = 3.14159; 定义时必须初始化，之后不可修改。',
            'const 与指针三连：const int* p（指向的内容不可改）、int* const p（指针本身不可改）、const int* const p（都不可改）——从右往左读。',
            'constexpr（C++11）表示编译期常量：constexpr int N = 100; 可用于数组长度，比 #define 有类型检查，现代 C++ 推荐用它取代宏常量。',
          ],
        },
      ],
      quiz: [
        {
          question: 'cout << 7 / 2 << " " << 7.0 / 2 的输出是？',
          options: ['A. 3.5 3.5', 'B. 3 3.5', 'C. 3 3', 'D. 编译错误'],
          answer: 'B',
          explanation: '整数除法截断得 3；有浮点参与则按浮点计算得 3.5。',
        },
        {
          question: '表达式 (int)3.99 + (int)1.01 的值是 ______。',
          answer: '4',
          explanation: '强转截断小数（不是四舍五入）：3 + 1 = 4。',
        },
        {
          question: 'const int* p 与 int* const p 的区别是？',
          answer: '前者指向的内容不可通过 p 修改（指针可改指向）；后者指针本身不可改指向（内容可改）',
          explanation: '读法：从右往左。const 在 * 左修饰内容，在 * 右修饰指针本身。',
        },
      ],
    },
    {
      id: 'cpp-ch3',
      title: '第 3 章 流程控制与函数',
      intro: '分支循环与函数重载、默认参数、内联函数。',
      sections: [
        {
          title: '3.1 分支与循环',
          content: [
            'if 的条件可以是整数（非 0 即真），因此 if (x = 5) 编译通过且恒真——把赋值误写成条件是 C/C++ 最经典的 bug，防御写法是把常量写左边：if (5 == x)。',
            'switch 只支持整型、字符型、枚举，不支持浮点和字符串（与 Java 不同）。case 穿透规则与 Java 一致。',
            '循环三兄弟 for / while / do-while 与 break / continue 语义与 C 完全一致。C++11 范围 for：for (int x : arr) 遍历容器/数组，加 & 可修改元素。',
            'goto 语句可跳到标签，除跳出多重嵌套外应避免使用——结构化编程的基本共识。',
          ],
        },
        {
          title: '3.2 函数进阶特性',
          content: [
            '函数重载：同名函数靠参数列表区分（个数/类型），返回值不同不构成重载。编译器按"最匹配"原则选择，歧义时报错。',
            '默认参数：int area(int w, int h = 5); 默认参数必须从右往左连续提供；声明给默认值，定义不再重复给。',
            '内联函数 inline 建议编译器把函数体嵌入调用处，省去调用开销，适合短小频繁调用的函数。递归函数不能真正内联。',
            '函数声明与定义分离：原型 int add(int, int); 放头文件，定义放源文件。调用前必须有声明，否则编译报错。',
          ],
        },
        {
          title: '3.3 引用传参与函数返回引用',
          content: [
            '值传递产生副本，改形参不影响实参；引用传参 void swap(int& a, int& b) 直接操作原变量——比指针写法更优雅安全，是 C++ 特色。',
            '大对象传参用 const 引用：void print(const string& s) 避免拷贝开销，又防止误改。',
            '函数可以返回引用（如 operator<< 链式输出），但绝不能返回局部变量的引用——局部变量随函数结束销毁，返回的是悬垂引用。',
          ],
          code: {
            lang: 'cpp',
            caption: '引用实现交换',
            source: `void swap(int& a, int& b) {
    int t = a; a = b; b = t;
}
int main() {
    int x = 3, y = 5;
    swap(x, y);
    cout << x << " " << y << endl;  // 5 3
}`,
          },
        },
      ],
      quiz: [
        {
          question: 'if (x = 5) 在 C++ 中？',
          options: ['A. 编译错误', 'B. 恒为假', 'C. 恒为真且 x 被赋值为 5', 'D. 比较 x 是否等于 5'],
          answer: 'C',
          explanation: '= 是赋值，表达式值为 5（非 0 即真）。防御写法 if (5 == x) 让编译器帮你抓笔误。',
        },
        {
          question: '下列哪组函数构成合法重载？',
          options: ['A. int f(int); double f(int);', 'B. int f(int); int f(double);', 'C. int f(int a); int f(int b);', 'D. void f(); int f();'],
          answer: 'B',
          explanation: '重载看参数列表（类型/个数/顺序）；仅返回值不同（A、D）或仅参数名不同（C）不构成重载。',
        },
        {
          question: '默认参数必须从 ______ 往 ______ 连续提供。',
          answer: '右；左',
          explanation: 'int f(int a, int b = 1, int c = 2) 合法；int f(int a = 1, int b) 非法。',
        },
        {
          question: '函数返回局部变量的引用会导致 ______。',
          answer: '悬垂引用（未定义行为）',
          explanation: '局部变量在函数结束时销毁，返回的引用指向已释放的内存。',
        },
      ],
    },
    {
      id: 'cpp-ch4',
      title: '第 4 章 数组、指针与字符串',
      intro: 'C++ 内存模型的核心：指针运算、动态内存与 string 类。',
      sections: [
        {
          title: '4.1 指针深入',
          content: [
            '指针保存地址：int* p = &a; *p 解引用访问目标。指针+1 按所指类型大小步进（int* 加 4 字节）。& 取地址、* 解引用，是一对互逆运算。',
            '数组名是首元素地址（常量指针），arr[i] 等价于 *(arr + i)。指针与数组不等价：sizeof(arr) 是整个数组大小，sizeof(p) 是指针本身大小（64 位系统 8 字节）。',
            '空指针写 nullptr（C++11），不要再写 NULL 或 0。野指针（未初始化）与内存泄漏是指针两大事故源。',
            '指针数组 int* arr[5]（数组，元素是指针）与数组指针 int (*p)[5]（指针，指向数组）——优先级 () > [] > *，读法从内向外。',
          ],
        },
        {
          title: '4.2 动态内存',
          content: [
            'new 在堆上申请：int* p = new int(10); 释放用 delete p;。数组形式：new int[n] 配 delete[] p;——必须成对匹配，混用是未定义行为。',
            '忘记 delete 造成内存泄漏；delete 后继续访问是悬垂指针，规范做法是 delete 后立即 p = nullptr。',
            '栈与堆对比：栈上变量自动管理、速度快、空间有限（几 MB）；堆上手动管理、空间大、速度稍慢。大数组必须放堆上（栈会溢出）。',
            '现代 C++ 推荐智能指针（unique_ptr/shared_ptr）自动管理内存，遵循 RAII 原则；但考试仍以原生指针为主。',
          ],
        },
        {
          title: '4.3 string 类与 C 字符串',
          content: [
            'std::string 是 C++ 的字符串类：支持 + 拼接、== 直接比较、length()/size()、substr(pos,len)、find()、c_str() 转 C 字符串、push_back 追加字符。',
            'C 风格字符串是 char 数组，以 \\0 结尾，用 strlen/strcpy/strcat/strcmp 操作，易越界，工程中优先用 string。',
            'string 下标访问 s[i] 不检查越界（可能 UB），s.at(i) 越界抛 out_of_range 异常——要安全用 at。',
          ],
          code: {
            lang: 'cpp',
            source: `string s = "Code";
s += "Matrix";               // 拼接
cout << s.length() << endl;  // 10
cout << s.substr(0, 4) << endl;  // Code
if (s == "CodeMatrix") cout << "相等" << endl;`,
          },
        },
        {
          title: '4.4 结构体与联合体',
          content: [
            'struct 把不同类型的数据打包：struct Point { double x, y; }; C++ 中 struct 与 class 几乎相同，唯一区别是默认访问权限（struct 为 public）。',
            '成员访问：对象用 .（p.x），指针用 ->（pp->x 等价于 (*pp).x）。',
            'union 共用同一块内存，大小取决于最大成员，任一时刻只有效存储一个成员——了解即可。',
          ],
        },
      ],
      quiz: [
        {
          question: 'int a[5]; sizeof(a) 与 int* p = a; sizeof(p) 在 64 位系统分别是？',
          options: ['A. 20 和 8', 'B. 5 和 8', 'C. 20 和 20', 'D. 8 和 20'],
          answer: 'A',
          explanation: '数组名做 sizeof 得整个数组 5×4=20 字节；指针做 sizeof 得指针本身 8 字节。',
        },
        {
          question: 'new int[10] 分配的内存应该用 ______ 释放。',
          answer: 'delete[]',
          explanation: 'new[] 必须配对 delete[]，混用 delete 是未定义行为。',
        },
        {
          question: 'int a[] = {10, 20, 30}; int* p = a; *(p + 1) 的值是？',
          options: ['A. 10', 'B. 20', 'C. 30', 'D. 地址值'],
          answer: 'B',
          explanation: 'p+1 指向 a[1]，解引用得 20。指针步进单位是元素大小而非 1 字节。',
        },
        {
          question: 'string s = "abc"; s.at(5) 与 s[5] 的区别是？',
          answer: 'at(5) 越界抛 out_of_range 异常；s[5] 不检查，是未定义行为',
          explanation: '要安全用 at()，要速度用 []（确保不越界）。',
        },
      ],
    },
    {
      id: 'cpp-ch5',
      title: '第 5 章 类与对象',
      intro: '封装、构造/析构、拷贝控制、this 指针与运算符重载。',
      sections: [
        {
          title: '5.1 类的基本结构',
          content: [
            'class 默认成员为 private，struct 默认为 public——这是二者唯一区别。成员函数可在类内声明、类外用 类名:: 定义。',
            '构造函数与类同名无返回类型；析构函数 ~类名() 无参无返回，对象销毁时自动调用，用于释放资源。',
            '构造顺序：先成员对象后自身；析构顺序恰好相反。对象数组要求存在无参构造（或提供初始化列表）。',
            '成员初始化列表：Point(int x, int y) : x(x), y(y) {} 比在函数体赋值更高效，const 成员与引用成员必须用初始化列表。',
          ],
        },
        {
          title: '5.2 拷贝构造与运算符重载',
          content: [
            '拷贝构造 MyClass(const MyClass& other) 在用已有对象初始化新对象时调用；赋值运算符 operator= 在已存在对象之间赋值时调用——区分场景是高频考点：A a = b; 是拷贝构造（初始化），a = b; 是赋值运算符。',
            '深拷贝 vs 浅拷贝：类中有裸指针成员时，编译器默认的浅拷贝会导致两个对象共享同一块堆内存，析构时 double free，必须自写拷贝构造与赋值运算符（三/五法则）。',
            '运算符重载本质是按特殊命名的函数：Complex operator+(const Complex& o)。不能改变优先级、不能造新运算符、. :: sizeof ?: 不可重载。',
          ],
          code: {
            lang: 'cpp',
            caption: '重载 + 运算符',
            source: `class Complex {
    double re, im;
public:
    Complex(double r, double i) : re(r), im(i) {}
    Complex operator+(const Complex& o) {
        return Complex(re + o.re, im + o.im);
    }
    void show() { cout << re << "+" << im << "i" << endl; }
};`,
          },
        },
        {
          title: '5.3 this 指针与静态成员',
          content: [
            'this 是指向当前对象的指针，成员函数内部隐式可用。return *this 返回自身引用支持链式调用（如连续 +=）。',
            'static 成员变量全类共享一份，类外初始化：int Counter::count = 0;；static 成员函数没有 this 指针，只能访问静态成员。',
            '友元 friend 函数/类可以访问类的 private 成员，常用于重载 << >> 运算符（左操作数是 ostream，无法做成成员函数）。',
          ],
        },
      ],
      quiz: [
        {
          question: 'A a; A b = a; 与 b = a;（b 已存在）分别调用？',
          options: ['A. 都是拷贝构造', 'B. 拷贝构造和赋值运算符', 'C. 赋值运算符和拷贝构造', 'D. 都是构造函数'],
          answer: 'B',
          explanation: '定义时初始化走拷贝构造；已存在对象之间赋值走 operator=。',
        },
        {
          question: '类中含有指针成员指向堆内存，只写析构函数会发生什么？',
          answer: '浅拷贝导致两个对象共享同一块内存，析构时同一块内存被 delete 两次（double free）',
          explanation: '三/五法则：需要自定义析构的类，几乎一定也要自定义拷贝构造和赋值运算符。',
        },
        {
          question: 'static 成员函数中能否访问非静态成员变量？为什么？',
          answer: '不能。static 成员函数没有 this 指针，不知道操作哪个对象',
          explanation: '静态成员属于类；非静态成员属于对象。没有对象就没有非静态成员。',
        },
      ],
    },
    {
      id: 'cpp-ch6',
      title: '第 6 章 继承、多态与 STL',
      intro: '虚函数、多态机制与标准模板库容器。',
      sections: [
        {
          title: '6.1 继承与多态',
          content: [
            '继承方式 public/protected/private 决定父类成员在子类中的可见性，class 默认 private 继承，struct 默认 public。公有继承表达 is-a 关系。',
            '多态条件：父类声明 virtual 虚函数 + 基类指针/引用指向子类对象。虚函数靠虚表（vtable）在运行时决定调用哪个版本（动态绑定）。',
            '纯虚函数 virtual void draw() = 0; 使类成为抽象类，不能实例化。含纯虚函数的类只能作接口/基类。',
            '父类析构函数应声明为 virtual，否则通过父类指针 delete 子类对象时子类析构不会执行——内存泄漏的经典来源。构造与析构函数中调用虚函数不多态。',
          ],
        },
        {
          title: '6.2 STL 三大件',
          content: [
            '容器：vector（动态数组，push_back/[]，自动扩容）、list（双向链表）、stack/queue（适配器，LIFO/FIFO）、set/map（红黑树，自动排序去重）、unordered_map（哈希表，平均 O(1)）。',
            '迭代器是"泛化的指针"：for (auto it = v.begin(); it != v.end(); ++it)，C++11 起更常用范围 for：for (auto& x : v)。',
            '算法头文件 <algorithm>：sort(v.begin(), v.end())、find、count、reverse、max_element、lower_bound（二分），全部配合迭代器工作。',
            'sort 自定义比较：sort(v.begin(), v.end(), greater<int>()) 降序；或传 Lambda sort(..., [](int a, int b){ return a > b; })。',
          ],
          code: {
            lang: 'cpp',
            caption: 'vector + sort',
            source: `#include <vector>
#include <algorithm>
vector<int> v = {5, 2, 8, 1};
sort(v.begin(), v.end());        // 1 2 5 8
for (int x : v) cout << x << " ";
v.push_back(10);                  // 尾部插入`,
          },
        },
        {
          title: '6.3 map 与 pair 实战',
          content: [
            'map<string, int> cnt; cnt["apple"]++ 是最流行的计数写法——operator[] 在键不存在时自动插入默认值（int 为 0）。',
            'pair 是二元组：make_pair(a, b)，用 .first / .second 访问；map 的迭代器 *it 就是 pair。',
            '遍历 map：for (auto& [k, v] : m)（C++17 结构化绑定）或 for (auto& p : m) cout << p.first << p.second。',
          ],
        },
      ],
      quiz: [
        {
          question: 'class Base { public: void f(){ cout<<"B"; } }; class D : public Base { public: void f(){ cout<<"D"; } }; Base* p = new D(); p->f(); 输出？',
          options: ['A. D', 'B. B', 'C. 编译错误', 'D. 运行崩溃'],
          answer: 'B',
          explanation: 'f 不是虚函数，静态绑定按指针声明类型调用 Base::f。想输出 D 必须给 Base::f 加 virtual。',
        },
        {
          question: '为什么基类的析构函数通常要声明为 virtual？',
          answer: '否则通过基类指针 delete 子类对象时只调用基类析构，子类部分资源泄漏',
          explanation: '虚析构保证 delete 时按实际对象类型走完整析构链。',
        },
        {
          question: 'vector 与 list 的核心区别是？',
          answer: 'vector 底层连续数组，随机访问 O(1) 中间插删慢；list 底层双向链表，插删 O(1) 但不能随机访问',
          explanation: '与 Java 的 ArrayList/LinkedList 对应。绝大多数场景首选 vector。',
        },
        {
          question: 'map<string,int> m; 执行 m["x"]++ 后 m["x"] 的值为 ______。',
          answer: '1',
          explanation: 'operator[] 对不存在的键自动插入默认值 0，再自增得 1——这是计数器的标准写法。',
        },
      ],
    },
    {
      id: 'cpp-ch7',
      title: '第 7 章 指针与引用进阶',
      intro: '指针是 C++ 的威力之源，也是 bug 之源。本章把指针的高级形态一次讲透：指针运算、指针数组、二级指针、函数指针，以及和引用的本质区别。',
      sections: [
        {
          title: '7.1 指针运算与指针数组',
          content: [
            '指针加减的单位是"一个元素"而不是一个字节：int *p 的 p + 1 地址实际前进 4 字节。这正是 p[i] 等价于 *(p + i) 的原因。',
            '指针数组：int *arr[5] 是"装指针的数组"，每个元素都是 int*。常用来管理多个字符串：const char *names[] = {"张三", "李四"}。',
            '数组指针：int (*p)[5] 是"指向整个数组的指针"，括号不能省——它和指针数组只差一对括号，含义天差地别。',
            '读复杂声明的口诀"右左右"：从变量名出发，先向右看、再向左看、遇括号跳出。int *arr[5]：arr 先遇 [5]，所以是数组，元素是 int*。',
          ],
          code: {
            lang: 'cpp',
            caption: '指针运算与指针数组',
            source: `int a[3] = {10, 20, 30};
int *p = a;
cout << *(p + 1);   // 20，前进一个 int（4 字节）

const char *names[] = {"张三", "李四", "王五"};
for (int i = 0; i < 3; i++) {
    cout << names[i] << endl;  // 逐个打印字符串
}

int (*q)[3] = &a;  // 指向整个数组的指针
cout << (*q)[2];   // 30`,
          },
        },
        {
          title: '7.2 二级指针与指针作函数参数',
          content: [
            '二级指针 int **pp 存"指针的地址"：int a = 1; int *p = &a; int **pp = &p; 则 **pp 就是 1。',
            '函数想改变调用者的指针本身（比如让指针指向新分配的内存），必须传指针的指针（或指针的引用）：void alloc(int **pp) { *pp = new int(5); }。',
            'C++ 有更优雅的选择——指针的引用：void alloc(int *&p) { p = new int(5); }，调用处直接传 p 即可，代码清爽得多。',
            'main 函数的参数 int main(int argc, char *argv[]) 里 argv 就是指针数组（等价 char **argv），存放命令行参数。',
          ],
          code: {
            lang: 'cpp',
            caption: '二级指针 vs 指针引用',
            source: `// C 风格：二级指针
void alloc(int **pp) { *pp = new int(42); }

// C++ 风格：指针的引用，更推荐
void alloc2(int *&p) { p = new int(43); }

int main() {
    int *p = nullptr;
    alloc(&p);   // 传指针的地址
    alloc2(p);   // 直接传，引用天然"可改"
    cout << *p;  // 43
    delete p;
}`,
          },
        },
        {
          title: '7.3 函数指针初步',
          content: [
            '函数也有地址，可以存进指针：int (*fp)(int, int) = add; 之后 fp(3, 4) 等价于 add(3, 4)。',
            '函数指针的价值在"回调"：把函数当作参数传给另一个函数，让对方在合适的时候调用它。qsort、sort 的比较函数就是这个思想。',
            'C++11 的 lambda 表达式 [ ](int a, int b){ return a < b; } 是匿名小函数，多数场景已取代手写函数指针。',
            '判断优先级：函数声明 int *f(int) 是"返回 int* 的函数"；int (*f)(int) 才是"指向函数的指针"——那对括号决定一切。',
          ],
          code: {
            lang: 'cpp',
            caption: '函数指针与 lambda 回调',
            source: `#include <algorithm>

int add(int a, int b) { return a + b; }

int main() {
    int (*fp)(int, int) = add;   // 函数指针
    cout << fp(3, 4);            // 7

    int v[3] = {3, 1, 2};
    // lambda 作为比较回调：降序
    std::sort(v, v + 3, [](int a, int b) { return a > b; });
}`,
          },
        },
      ],
      quiz: [
        {
          question: 'int *p 指向 int 数组首元素，p + 2 的地址实际前进多少字节（int 为 4 字节）？',
          options: ['A. 2 字节', 'B. 4 字节', 'C. 8 字节', 'D. 取决于数组长度'],
          answer: 'C',
          explanation: '指针算术以元素为单位：p + 2 前进 2 个 int，即 2 × 4 = 8 字节。',
        },
        {
          question: '函数中想让调用者的指针指向新内存，C++ 最推荐的参数写法是？',
          answer: '指针的引用 void f(int *&p)，在函数内直接 p = new int(...)',
          explanation: '值传递改不了实参指针本身；二级指针可行但繁琐；指针引用既直观又安全，是 C++ 的改进。',
        },
        {
          question: 'int (*f)(int) 和 int *f(int) 的区别是？',
          answer: '前者是指向"参数 int、返回 int 的函数"的指针；后者是"参数 int、返回 int* 的函数"的声明',
          explanation: '括号改变结合优先级：(*f) 先结合说明 f 是指针；没有括号则 f 先与 (int) 结合成函数声明。',
        },
      ],
    },
    {
      id: 'cpp-ch8',
      title: '第 8 章 STL 实战进阶',
      intro: 'STL 是 C++ 程序员的武器库。本章把容器与算法拉到实战强度：vector/string 高频操作、set 与哈希容器的选择、迭代器与 algorithm 库的杀手锏组合。',
      sections: [
        {
          title: '8.1 vector 与 string 高频操作',
          content: [
            '`vector` 动态数组核心操作：push_back 追加、pop_back 删尾、size() 大小、empty() 判空、clear() 清空、front()/back() 取首尾。[] 不检查越界，at() 会抛异常。',
            'vector 扩容会整体搬家（容量翻倍策略），频繁 push_back 前用 reserve(n) 预留空间能显著提速。size 是元素个数，capacity 是底层容量，别混淆。',
            '`string` 高频操作：s += "x" 拼接、s.substr(1, 3) 截取、s.find("ab") 查找（找不到返回 string::npos）、s.insert / s.erase / s.replace 增删改。',
            '字符串与数字互转：to_string(42) 得 "42"；stoi("123")、stod("3.14") 转回数字，转换失败抛异常。',
          ],
          code: {
            lang: 'cpp',
            caption: 'vector 与 string 的日常',
            source: `vector<int> v;
v.reserve(100);            // 预留空间，避免反复扩容
for (int i = 0; i < 5; i++) v.push_back(i * i);

string s = "hello world";
cout << s.substr(6);              // "world"
size_t pos = s.find("o");
if (pos != string::npos) cout << pos;  // 4

string num = to_string(2026);
int y = stoi(num) + 1;            // 2027`,
          },
        },
        {
          title: '8.2 set、unordered_map 与哈希容器',
          content: [
            '`set` 自动去重且有序（红黑树）：插入自动排序，begin() 就是最小值。multiset 允许重复。',
            '`unordered_set / unordered_map` 是哈希版：查找插入平均 O(1)，比 set/map 的 O(log n) 更快，但元素无序。只要快不要顺序就用它。',
            'map 的 [] 有副作用：m["key"] 在键不存在时会自动插入一个默认值！只想查询请用 find() 或 count()。',
            '遍历有序与无序容器写法相同：for (auto &[k, v] : m)（C++17 结构化绑定），但输出的顺序一个按 key 排好、一个"随机"。',
          ],
          code: {
            lang: 'cpp',
            caption: 'set 去重排序 + unordered_map 词频统计',
            source: `#include <set>
#include <unordered_map>

set<int> s = {5, 1, 3, 1, 5};   // 自动去重+排序
for (int x : s) cout << x << " "; // 1 3 5

unordered_map<string, int> cnt;
string words[] = {"a", "b", "a"};
for (auto &w : words) cnt[w]++;   // [] 不存在时自动建 0 再 ++
cout << cnt["a"];                 // 2`,
          },
        },
        {
          title: '8.3 迭代器与 algorithm 算法库',
          content: [
            '`迭代器`是容器与算法之间的"通用插头"：所有容器都提供 begin()/end()，所有算法都操作迭代器区间 [begin, end)——左闭右开是铁律。',
            '#include <algorithm> 常用函数：sort 排序、reverse 反转、count 计数、find 查找、max_element/min_element 求最值（返回迭代器，加 * 取值）、accumulate（在 <numeric> 里）求和。',
            '自定义排序规则：sort(v.begin(), v.end(), greater<int>()) 降序；或传 lambda [](int a, int b){ return a > b; }。',
            'sort 结构体/ pair 时默认按 first 升序、first 相同按 second 升序——pair 的这个特性在做"多关键字排序"时特别好用。',
          ],
          code: {
            lang: 'cpp',
            caption: 'algorithm 库一把梭',
            source: `#include <algorithm>
#include <numeric>

vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};
sort(v.begin(), v.end());                    // 升序
cout << *max_element(v.begin(), v.end());    // 9
cout << count(v.begin(), v.end(), 1);        // 2
int sum = accumulate(v.begin(), v.end(), 0); // 31

// 多关键字：按成绩降序、成绩相同按年龄升序
vector<pair<int,int>> st = {{90,20},{85,19},{90,18}};
sort(st.begin(), st.end(),
     [](auto &a, auto &b){ return a.first != b.first
         ? a.first > b.first : a.second < b.second; });`,
          },
        },
      ],
      quiz: [
        {
          question: '只想查询 map 中某键是否存在且不想改变 map，应该用？',
          options: ['A. m[key]', 'B. m.find(key) 或 m.count(key)', 'C. m.at(key)', 'D. m[key] = 0'],
          answer: 'B',
          explanation: 'm[key] 在键不存在时会插入默认值，污染容器；find 返回迭代器、count 返回 0/1，都不改变容器。at 会抛异常，也算安全但不是"查询"语义。',
        },
        {
          question: 'set 和 unordered_set 的核心区别是？',
          answer: 'set 元素自动有序、操作 O(log n)（红黑树）；unordered_set 无序、平均 O(1)（哈希表）',
          explanation: '需要有序遍历或取最值用 set；纯粹追求查找插入速度用 unordered_set。',
        },
        {
          question: 'algorithm 库的函数为什么都以 begin()/end() 为参数而不是直接传容器？',
          answer: '迭代器是容器与算法解耦的通用接口：同一算法可作用于任何容器（甚至数组）的任意子区间',
          explanation: '这正是 STL 的设计精髓——算法不关心数据存在哪种容器里，只要能拿到一对迭代器就能工作。',
        },
      ],
    },
  ],
  patterns: [
    {
      id: 'cpp-p1',
      title: '读程序写结果：指针与数组',
      category: '读程序写结果',
      difficulty: 4,
      analysis: [
        '指针题的画图法：画出内存格子，标出每个指针指向哪里，逐步跟踪 * 与 ++ 的作用。',
        '优先级记忆：*p++ 等价于 *(p++)（先用后移），(*p)++ 是值加 1。',
      ],
      keyPoints: ['* 与 ++ 的优先级', '指针步长 = 类型大小', '数组名是常量指针', 'sizeof 指针 vs 数组'],
      example: {
        question: 'int a[] = {10, 20, 30}; int* p = a; cout << *p++ << " " << *p; 输出什么？',
        answer: '10 20',
        explanation: '*p++ 先取 *p（10）输出，然后 p 指向 a[1]；第二个 *p 取出 20。',
      },
      traps: ['以为 *p++ 是 (*p)++', '忘记指针已移动', '越界访问未定义行为仍试图"算"出确定值'],
    },
    {
      id: 'cpp-p2',
      title: '程序改错：引用与指针混用',
      category: '程序改错',
      difficulty: 3,
      analysis: [
        '引用必须初始化、不能改绑、不存在空引用；指针可以不初始化（危险）、可改指向、可为空。改错题常在这三点上做文章。',
        '函数想修改实参：用引用 int& 或指针 int*，形参为值传递则改不到外面。',
      ],
      keyPoints: ['引用定义即初始化', '值传递改不了实参', 'swap 的标准写法', 'nullptr 判空'],
      example: {
        question: '改错：void swap(int a, int b) { int t = a; a = b; b = t; } 调用后 x, y 未交换，为什么？如何改？',
        answer: '值传递只交换了副本。改为 void swap(int& a, int& b)，函数体不变。',
        explanation: '引用是实参的别名，函数内修改直接作用于原变量。',
      },
      traps: ['以为值传递能改实参', 'int& 与 int* 混淆', '交换逻辑缺少临时变量'],
    },
    {
      id: 'cpp-p3',
      title: '选择题：构造与析构调用顺序',
      category: '选择题',
      difficulty: 4,
      analysis: [
        '对象生命周期题的标准套路：列时间线。创建顺序 = 构造顺序；离开作用域按逆序析构。',
        '传值参数、返回值、临时对象都会触发拷贝构造，一条语句可能隐含着多次构造/析构。',
      ],
      keyPoints: ['先构造的后析构', '拷贝构造触发时机', '临时对象语句结束即析构', '静态对象程序结束才析构'],
      example: {
        question: 'main 中依次创建对象 A a; B b; 函数结束时析构顺序是？',
        answer: '先 ~B() 后 ~A()',
        explanation: '栈结构后进先出：后构造的对象先析构。',
      },
      traps: ['以为按创建顺序析构', '忽略传参产生的临时副本', '把 new 出的对象当作自动析构（需要 delete）'],
    },
    {
      id: 'cpp-p4',
      title: '编程题：STL 容器应用',
      category: '编程题',
      difficulty: 3,
      analysis: [
        'STL 题考察"选对容器"：要下标访问用 vector；要去重排序用 set；要键值查找用 map；要先进先出用 queue。',
        '配合 <algorithm> 的 sort/find/count 可以秒杀大部分数组处理题。',
      ],
      keyPoints: ['vector 常用操作', 'map 计数模板', 'sort 自定义比较', '范围 for 遍历'],
      example: {
        question: '读入一组整数存 vector，排序后去重输出。',
        code: `vector<int> v = {3, 1, 3, 5, 1};
sort(v.begin(), v.end());
v.erase(unique(v.begin(), v.end()), v.end());
for (int x : v) cout << x << " ";  // 1 3 5`,
        answer: '1 3 5',
        explanation: 'sort + unique + erase 是 STL 去重三连的固定套路：unique 把重复移到尾部并返回新逻辑末尾，erase 真正删除。',
      },
      traps: ['忘记 sort 就直接 unique（只去相邻重复）', 'unique 后忘记 erase', '遍历时修改 vector 导致迭代器失效'],
    },
    {
      id: 'cpp-p5',
      title: '读程序写结果：虚函数与多态',
      category: '读程序写结果',
      difficulty: 5,
      analysis: [
        '判断一次调用是否多态：看函数是否 virtual、调用方是否基类指针/引用。对象直接调用（obj.func()）不发生多态。',
        '构造函数中调用虚函数不多态（对象尚未完全构造），析构中同理。',
      ],
      keyPoints: ['virtual 才有动态绑定', '指针/引用才触发多态', '纯虚函数 → 抽象类', '虚析构防泄漏'],
      example: {
        question: 'class Base { public: virtual void f(){ cout<<"B"; } }; class Derived : public Base { public: void f(){ cout<<"D"; } }; Base* p = new Derived(); p->f(); 输出？若去掉 virtual 呢？',
        answer: '有 virtual 输出 D；去掉 virtual 输出 B',
        explanation: 'virtual 使 f 进入虚表，运行时按实际对象类型 Derived 调用；非虚函数静态绑定，按指针声明类型 Base 调用。',
      },
      traps: ['忽略 virtual 关键字的有无', '以为对象直接调用也会多态', 'delete 基类指针忘记虚析构'],
    },
    {
      id: 'cpp-p6',
      title: '程序填空：运算符重载',
      category: '程序填空',
      difficulty: 4,
      analysis: [
        '运算符重载填空的核心是记住签名形式：成员函数版少一个左操作数（this 充当）；友元版两个操作数都显式写出。',
        '<< 和 >> 必须用友元或普通函数重载（左操作数是 ostream，不是自己的类）。',
      ],
      keyPoints: ['成员版 vs 友元版', '返回引用支持链式（+=）', '前置++返回引用，后置++带 int 哑元', 'cout << 必须友元'],
      example: {
        question: '为 Complex 类补全前置 ++ 运算符（实部虚部各加 1）。',
        answer: 'Complex& operator++() { ++re; ++im; return *this; }',
        explanation: '前置 ++ 返回自身引用以支持连续操作；后置版本签名为 operator++(int)，先存副本再自增返回副本。',
      },
      traps: ['前置后置签名混淆', '返回局部对象的引用（悬垂）', '忘记 const 修饰参数'],
    },
  ],
  exercises: [
    {
      id: 'cpp-e1', type: 'choice', title: 'cout 输出格式', difficulty: 1, tags: ['入门'],
      question: '执行 cout << 7 / 2 << " " << 7.0 / 2; 输出为？',
      options: ['A. 3.5 3.5', 'B. 3 3.5', 'C. 3 3', 'D. 编译错误'],
      answer: 'B',
      explanation: '整数除法 7/2=3；只要有一个浮点数参与即得浮点结果 3.5。',
    },
    {
      id: 'cpp-e2', type: 'choice', title: '引用特性', difficulty: 2, tags: ['引用'],
      question: '关于 C++ 引用，下列说法错误的是？',
      options: [
        'A. 引用定义时必须初始化',
        'B. 引用可以重新绑定到另一个变量',
        'C. 引用是变量的别名，共享同一内存',
        'D. 函数用引用参数可以修改实参',
      ],
      answer: 'B',
      explanation: '引用一旦绑定终身不改，之后的"赋值"改的是被绑定变量的值，不是重新绑定。',
    },
    {
      id: 'cpp-e3', type: 'choice', title: '函数重载', difficulty: 3, tags: ['函数'],
      question: '下列哪组函数构成合法重载？',
      options: [
        'A. int f(int); double f(int);',
        'B. int f(int); int f(double);',
        'C. int f(int a); int f(int b);',
        'D. void f(); int f();',
      ],
      answer: 'B',
      explanation: '重载靠参数列表（类型/个数/顺序）区分；仅返回值不同（A、D）或仅参数名不同（C）不构成重载。',
    },
    {
      id: 'cpp-e4', type: 'choice', title: '指针运算', difficulty: 4, tags: ['指针'],
      question: 'int a[5] = {1,2,3,4,5}; int* p = a + 2; cout << *p; 输出为？',
      options: ['A. 1', 'B. 2', 'C. 3', 'D. 地址值'],
      answer: 'C',
      explanation: 'a + 2 指向 a[2]，解引用得 3。指针 +n 按元素步进 n 个位置。',
    },
    {
      id: 'cpp-e5', type: 'choice', title: '虚函数', difficulty: 4, tags: ['多态'],
      question: '关于虚函数，正确的是？',
      options: [
        'A. 静态成员函数可以是虚函数',
        'B. 构造函数可以是虚函数',
        'C. 析构函数可以是（且通常是）虚函数',
        'D. 虚函数在编译期绑定',
      ],
      answer: 'C',
      explanation: '析构函数可以是虚函数，且基类析构应为虚函数。静态函数与构造函数都不能是虚函数；虚函数是运行时绑定。',
    },
    {
      id: 'cpp-e6', type: 'fill', title: '补全引用交换', difficulty: 2, tags: ['引用', '函数'],
      question: '补全函数实现两个整数的交换：void swap(int& a, ______ b) { int t = a; a = b; b = t; }',
      answer: 'int&',
      explanation: '两个参数都必须用引用传递，否则只有第一个能被修改。',
    },
    {
      id: 'cpp-e7', type: 'fill', title: '动态内存配对', difficulty: 3, tags: ['内存'],
      question: 'int* p = new int[10]; 释放这块内存的正确语句是 ______。',
      answer: 'delete[] p;',
      explanation: 'new[] 必须配 delete[]，混用 delete 是未定义行为。',
    },
    {
      id: 'cpp-e8', type: 'coding', title: 'Hello C++ 与累加', difficulty: 1, tags: ['入门'],
      question: '第一行输出 "Hello C++"，第二行输出 1 到 100 的和，格式 "sum = 5050"。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    // 在这里编写代码

    return 0;
}`,
      expectedOutput: 'Hello C++\nsum = 5050',
      answer: 'cout << "Hello C++" << endl; 配合 for 循环累加。',
      explanation: '熟悉 iostream 输出与 for 循环的基本结构。',
      hints: ['cout << 可以链式输出', 'sum += i'],
    },
    {
      id: 'cpp-e9', type: 'coding', title: '三个数求最大值', difficulty: 2, tags: ['分支'],
      question: '给定 int a = 12, b = 7, c = 19; 输出最大值，格式 "max = 19"。不允许用数组或 algorithm 头文件。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 12, b = 7, c = 19;
    // 求最大值

    return 0;
}`,
      expectedOutput: 'max = 19',
      answer: 'int m = a; if (b > m) m = b; if (c > m) m = c;',
      explanation: '打擂台法：先假设 a 最大，逐个挑战。',
      hints: ['用中间变量 m', '两个 if 顺序比较'],
    },
    {
      id: 'cpp-e10', type: 'coding', title: '字符串反转输出', difficulty: 3, tags: ['string'],
      question: '将 string s = "CodeMatrix"; 反转输出 "xirtaMedoC"。',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "CodeMatrix";
    // 反转输出

    return 0;
}`,
      expectedOutput: 'xirtaMedoC',
      answer: 'for (int i = s.length() - 1; i >= 0; i--) cout << s[i]; 或 reverse(s.begin(), s.end()) 后输出。',
      explanation: '倒序下标遍历最直观；用 <algorithm> 的 reverse 更简洁。',
      hints: ['s.length() - 1 是最后一个下标', '注意 int i >= 0 条件'],
    },
    {
      id: 'cpp-e11', type: 'coding', title: '统计数组中的偶数', difficulty: 3, tags: ['数组'],
      question: 'int v[] = {1, 2, 3, 4, 5, 6}; 统计并输出偶数个数，格式 "even = 3"。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int v[] = {1, 2, 3, 4, 5, 6};
    // 统计偶数

    return 0;
}`,
      expectedOutput: 'even = 3',
      answer: 'int cnt = 0; for (int i = 0; i < 6; i++) if (v[i] % 2 == 0) cnt++;',
      explanation: '遍历数组用取余判断偶数，计数器累加。',
      hints: ['v[i] % 2 == 0', '别忘了输出格式 even = '],
    },
    {
      id: 'cpp-e12', type: 'coding', title: '冒泡排序实现', difficulty: 4, tags: ['数组', '算法'],
      question: '用冒泡排序将数组 {5, 2, 8, 1, 9} 升序排序，输出一行，数字间空格分隔："1 2 5 8 9"（行尾不留空格）。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a[] = {5, 2, 8, 1, 9};
    int n = 5;
    // 冒泡排序

    // 输出

    return 0;
}`,
      expectedOutput: '1 2 5 8 9',
      answer: '双重循环：for i in 0..n-2，for j in 0..n-2-i，a[j] > a[j+1] 则交换；输出时下标 0 直接输出，其余先输出空格。',
      explanation: '外层控制轮数，内层每轮把最大值"冒泡"到末尾，n-1-i 是内层上界。',
      hints: ['j < n - 1 - i', 'if (i > 0) cout << " "; 再 cout << a[i]; 控制空格'],
    },
    {
      id: 'cpp-e13', type: 'choice', title: '引用折叠与传参', difficulty: 4, tags: ['引用'],
      question: 'void f(int& x) { x = 100; } int a = 1; f(a); 之后 a 的值是？',
      options: ['A. 1', 'B. 100', 'C. 未定义', 'D. 编译错误'],
      answer: 'B',
      explanation: '引用参数是实参的别名，函数内修改直接作用于 a。',
    },
    {
      id: 'cpp-e14', type: 'choice', title: '拷贝构造时机', difficulty: 5, tags: ['类'],
      question: '下列哪个不会调用拷贝构造函数？（A 是某个类）',
      options: ['A. A a = b;', 'B. void f(A x) 传参', 'C. A a; a = b;', 'D. return 局部对象'],
      answer: 'C',
      explanation: 'a = b 对已存在对象赋值，调用的是赋值运算符 operator=；其余三个都是"用已有对象创建新对象"，走拷贝构造。',
    },
    {
      id: 'cpp-e15', type: 'choice', title: '静态成员', difficulty: 4, tags: ['类'],
      question: '关于 static 成员，下列说法错误的是？',
      options: [
        'A. 静态成员变量需要在类外定义初始化',
        'B. 静态成员函数可以用对象调用',
        'C. 静态成员函数中可以访问非静态成员',
        'D. 静态成员被所有对象共享',
      ],
      answer: 'C',
      explanation: '静态成员函数没有 this 指针，无法访问非静态成员。其余说法均正确。',
    },
    {
      id: 'cpp-e16', type: 'choice', title: 'STL 去重套路', difficulty: 4, tags: ['STL'],
      question: '对 vector<int> v 去重的正确顺序是？',
      options: [
        'A. unique → sort → erase',
        'B. sort → unique → erase',
        'C. erase → unique → sort',
        'D. sort → erase → unique',
      ],
      answer: 'B',
      explanation: '先 sort 使重复相邻 → unique 把重复移到尾部返回逻辑末尾 → erase 真正删除。固定三连，缺一不可。',
    },
    {
      id: 'cpp-e17', type: 'choice', title: '菱形继承', difficulty: 5, tags: ['继承'],
      question: '解决菱形继承（钻石问题）中基类成员重复二义性的机制是？',
      options: ['A. 模板', 'B. 虚继承 virtual inheritance', 'C. 友元', 'D. 命名空间'],
      answer: 'B',
      explanation: 'class B : virtual public A 使共同基类 A 在最终派生类中只有一份实例，消除二义性。',
    },
    {
      id: 'cpp-e18', type: 'choice', title: 'map 自动插入', difficulty: 4, tags: ['STL'],
      question: 'map<string,int> m; cout << m["hello"]; 输出是？',
      options: ['A. 报错：键不存在', 'B. 0', 'C. 随机值', 'D. 空'],
      answer: 'B',
      explanation: 'map 的 operator[] 对不存在的键会插入值初始化的默认值（int 为 0）并返回其引用。',
    },
    {
      id: 'cpp-e19', type: 'fill', title: '补全范围 for', difficulty: 2, tags: ['循环'],
      question: '遍历并修改 vector<int> v 中每个元素翻倍：for (______ x : v) { x *= 2; }',
      answer: 'int&（或 auto&）',
      explanation: '必须用引用遍历才能修改容器内元素；int x 只是副本，改了不影响原容器。',
    },
    {
      id: 'cpp-e20', type: 'fill', title: '补全纯虚函数', difficulty: 3, tags: ['多态'],
      question: '把 Shape 声明为抽象类：virtual double area() ______ = 0;',
      answer: 'const（位置在 = 0 之前；若题目只考纯虚函数语法，核心是 "= 0"）',
      explanation: '纯虚函数的标志是声明末尾 = 0；含纯虚函数的类不能实例化。成员函数尾部的 const 表示不修改成员。',
    },
    {
      id: 'cpp-e21', type: 'fill', title: '补全成员初始化列表', difficulty: 4, tags: ['类'],
      question: 'class P { const int id; public: P(int i) ______ { } }; 补全使 const 成员正确初始化。',
      answer: ': id(i)',
      explanation: 'const 成员和引用成员必须在构造函数的初始化列表中初始化，函数体内赋值来不及。',
    },
    {
      id: 'cpp-e22', type: 'coding', title: '打印等腰三角形', difficulty: 4, tags: ['循环', '图形'],
      question: '用星号打印 4 行等腰三角形：\n   *\n  ***\n *****\n*******\n（第 i 行有 4-i 个前导空格和 2i-1 个星号）',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 4;
    // 外层行，内层先打印空格再打印星号

    return 0;
}`,
      expectedOutput: '   *\n  ***\n *****\n*******',
      answer: 'for i 从 1 到 n：先内层循环打印 n-i 个空格，再内层循环打印 2*i-1 个星号，每行 endl。',
      explanation: '图形题核心是把"第几行"翻译成空格数与星号数的表达式：空格 n-i，星号 2i-1。',
      hints: ['for (int j = 0; j < n - i; j++) cout << " ";', 'for (int j = 0; j < 2 * i - 1; j++) cout << "*";'],
    },
    {
      id: 'cpp-e23', type: 'coding', title: '数组中第二大的数', difficulty: 5, tags: ['数组', '算法'],
      question: '数组 int a[] = {3, 9, 1, 9, 5, 7}; 中第二大的数是 7。输出 "second = 7"。要求一遍遍历完成（不允许排序）。',
      starterCode: `#include <iostream>
using namespace std;

int main() {
    int a[] = {3, 9, 1, 9, 5, 7};
    int n = 6;
    // 维护最大值 first 与次大值 second

    return 0;
}`,
      expectedOutput: 'second = 7',
      answer: 'first、second 初始为极小值；遍历时若 a[i] > first 则 second=first、first=a[i]；否则若 a[i] > second 且 a[i] < first 则 second=a[i]（去重）。',
      explanation: '一遍扫描同时维护前两名是经典面试题。注意"严格小于 first"的条件用于处理最大值重复的情况。',
      hints: ['int first = -1000000, second = -1000000;', 'if (a[i] > first) { second = first; first = a[i]; }', 'else if (a[i] > second && a[i] < first) second = a[i];'],
    },
    {
      id: 'cpp-e24', type: 'coding', title: '统计字符串字符分类', difficulty: 4, tags: ['string', '循环'],
      question: 'string s = "Hello2024Cpp"; 统计其中大写字母、小写字母、数字的个数，输出三行：\nupper = 2\nlower = 6\ndigit = 4',
      starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello2024Cpp";
    int upper = 0, lower = 0, digit = 0;
    // 遍历分类统计

    cout << "upper = " << upper << endl;
    cout << "lower = " << lower << endl;
    cout << "digit = " << digit << endl;
    return 0;
}`,
      expectedOutput: 'upper = 2\nlower = 6\ndigit = 4',
      answer: 'for (int i = 0; i < s.length(); i++) 用字符范围比较分类：\'A\'<=s[i]<=\'Z\'、\'a\'<=s[i]<=\'z\'、\'0\'<=s[i]<=\'9\'。',
      explanation: '字符比较本质是 ASCII 数值比较。大写为 H 和 C 共 2 个，小写为 e/l/l/o/p/p 共 6 个，数字 2024 共 4 个。',
      hints: ['s[i] >= \'A\' && s[i] <= \'Z\'', '三个 if 分开写或 if-else 链均可'],
    },
  ],
}
