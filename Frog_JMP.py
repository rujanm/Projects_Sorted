def solution(X, Y, D):
    if Y - X == 0:
        num_of_jumps = 0
    elif D > (Y-X):
        num_of_jumps = 1
    else:
        num_of_jumps = int((Y-X)/D)
        if num_of_jumps < ((Y-X)/D):
            num_of_jumps += 1
    return num_of_jumps
print(solution(1,1,3))