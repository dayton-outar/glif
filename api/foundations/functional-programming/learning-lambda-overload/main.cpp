#include <memory>
#include <utility>
#include <variant>
#include <array>
#include <algorithm>
#include <iostream>

template<typename ... B>
struct visitor : B ... { using B::operator()...; };

template<typename ... T>
visitor(T...) -> visitor<std::decay_t<T>...>;

int main()
{
    std::array<std::variant<double, int>, 4> a{3.2, 6, 5, 8.5};

    int iTotal = 0;
    double dTotal = 0.0;

    visitor visited{ [&iTotal](const int i) { iTotal += i; }, [&dTotal](const double d) { dTotal+= d; } };

    std::for_each(begin(a), end(a), 
                [&visited](const auto &v){ std::visit(visited, v); });

    std::cout << "Integer total: " << iTotal << "; Double total: " << dTotal << std::endl;

    return iTotal;
}