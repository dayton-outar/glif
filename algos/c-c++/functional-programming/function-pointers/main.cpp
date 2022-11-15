#include <iostream>
#include <math.h>

double f(double x) {
    return 2 * x;
}

double sum(double f(double), int n, int m) { // uses function pointer ... declaring signature within argument parameter list
    double result = 0;
    for (int i = n; i <= m; i++)
        result += f(i);
    return result;
}

/**
 * Finds root of a continuous function
 * 
 * @param f Function pointer
 * @param a ...
 * @param b ...
 * @param epsilon ...
 * 
 * @return Root of function
 */
double root(double (*f)(double), double a, double b, double epsilon) {
    double middle = (a + b) / 2;
    while (f(middle) != 0 && fabs(b - a) > epsilon) { // ... fabs returns absolute value
        if (f(a) * f(middle) < 0)   // if f(a) and f(middle) have
               b = middle;           // opposite signs;
        else a = middle;
        middle = (a + b) / 2;
    }
    return middle;
}

int main(int argc, char *argv[])
{
    std::cout << "sum:f --> " << sum(f, 1, 5) << std::endl; // Outputs: 30

    std::cout << "sum:sin --> " << sum(sin, 3, 7) << std::endl; // Outputs: -1.19704

    std::cout << "root --> " << root(f, 16, 8, 2) << std::endl; // Outputs: 9
}