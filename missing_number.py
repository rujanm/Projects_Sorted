def solution(A):
    # write your code in Python 3.6
    array_sum = 0
    for element in A:
        array_sum += element
    missing_number = int((min(A)+max(A))*len(A)/2 - array_sum)
    print((min(A)+max(A))*len(A)/2)
    return print(missing_number)