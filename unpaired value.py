def solution(A):
    # write your code in Python 3.6
    while len(A) > 0:
        element = A[0]
        del A[0]
        try:
            del A[A.index(element)]
        except:
            break

    print(A)
    return element
print(solution([9, 3, 9, 3, 9, 7, 9]))