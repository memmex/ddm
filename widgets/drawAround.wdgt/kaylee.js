(function(){
	var code = document.createTextNode(
`
strokedatabase = [
                  ["1a", [-1, -1, (cos(0.1 * pi), sin(0.1 * pi)), (0, -1), (cos(-0.3 * pi), sin(-0.3 * pi)), 1, -1, -1,  0,  
                          1,  0,  -1, -1, (-1, 0), (cos(-0.33 * pi), sin(-0.33 * pi)), -1]],
                          
                          
                  ["1b", [-1,  1, (0, -1), (0, -1), (0, -1), -1, -1,  0,  1,  
                          1,  1,   0, -1, (0, 1), (0, -1), -1]],
                         
                         
                  ["2", [-1, -1, (sin(0.2 * pi), cos(0.2 * pi)), (1, 0), (cos(-0.25 * pi), sin(-0.25 * pi)), -1, -1,  0,  0, 
                         0,  1,  -1, 0, (cos(0.75 * pi), sin(0.75 * pi)), (cos(1.75 * pi), sin(1.75 * pi)), -1]],
                         
                         
                  ["3", [-1, -1, (1, 0),  (-1, 0), (0, -1), 1, -1,  0,  0, 
                         0, -1,   1, 0, (cos(0.75 * pi), sin(0.75 * pi)), (cos(1.25 * pi), sin(1.25 * pi)), -1]],
                          
                          
                  ["4a", [-1, -1, (0, -1), (1, 0),  (cos(-0.25 * pi), sin(-0.25 * pi)), -1,  1,  1,  1, 
                          1,  0,  -1, -1, (cos(0.67 * pi), sin(0.67 * pi)), (cos(1.75 * pi), sin(1.75 * pi)), -1]],
                         
                         
                  ["4b", [-1, -1, (-1, 0), (0, -1), (cos(1.25 * pi), sin(1.25 * pi)), -1,  1, -1,  0,  
                          0,  0,   0, 1, (1, 0), (0, -1), -1]],
                         
                         
                  ["5a", [-1, -1, (0, -1), (-1, 0), (0, -1), 1, -1, -1,  0,  
                          0,  0,   0, -1, (cos(0.67 * pi), sin(0.67 * pi)), (cos(1.25 * pi), sin(1.25 * pi)), -1]],
                          
                          
                  ["5b", [-1, -1, (-1, 0), (-1, 0), (cos(1.25 * pi), sin(1.25 * pi)), -1, -1,  0,  0,  
                          0,  1,  -1, -1, (cos(0.25 * pi), sin(0.25 * pi)), (cos(1.25 * pi), sin(1.25 * pi)), -1]],
                         
                         
                  ["6", [-1, -1, (-1, 0), (-1, 0), (cos(1.25 * pi), sin(1.25 * pi)), -1, -1,  1,  0,
                        -1,  1,  -1, 0, (cos(0.33 * pi), sin(0.33 * pi)), (0, 0), 1]],
                         
                         
                  ["7", [-1, -1, (1, 0),  (0, -1), (cos(1.67 * pi), sin(1.67 * pi)), 1, -1, -1,  0,  
                         1,  0,  -1, -1, (cos(0.75 * pi), sin(0.75 * pi)), (cos(1.5 * pi), sin(1.5 * pi)), -1]],
                          
                          
                  ["8", [1, -1, (0, 0), (0, 0), (0, 0), 0,  0,  0, -1, 
                       -1,  0, 0, 1, (0, 0), (0, 0), 0]],
                          
                          
                  ["9a", [-1, -1, (-1, 0), (-1, 0), (0, -1),-1, -1,  0, -1,  
                          0,  1,  -1, 0, (cos(0.33 * pi), sin(0.33 * pi)), (cos(1.33 * pi), sin(1.33 * pi)), -1]],
                         
                         
                  ["9b", [-1, -1, (-1, 0), (0, -1), (0, -1), -1,  1,  0, -1, 
                          0,  0,   0, 0, (cos(0.33 * pi), sin(0.33 * pi)), (cos(1.75 * pi), sin(1.75 * pi)), -1]],
                         
                         
                  ["9c", [-1, -1, (0, -1), (cos(1.4 * pi), sin(1.4 * pi)), (0, -1), -1, -1, -1, -1,
                          0,  1,  -1, 0, (cos(0.25 * pi), sin(0.25 * pi)), (0, -1), 0]],
                         
                          
                  ["0a", [1, -1, (0, 0), (0, 0), (0, 0), 0,  0,  1, -1, 
                        -1, 0, 0, 0, (0, 0), (0, 0), -1]],
                  
                  
                  ["0b", [1, -1, (0, 0), (0, 0), (0, 0), 0,  0,  -1, -1,
                        -1, 0, 0, 0, (0, 0), (0, 0), -1]],
                      
                      
                  ["0c", [0, -1, (-1, 0), (1, 0), (1, 0), -1,  1,  1, -1,
                        -1, -1, 0, 0, (0, 1), (sin(0.3 * pi), cos(0.3 * pi)), -1]],
                          
                          
                  ["-a", [-1,  1, (1, 0),  (1,  0), (1, 0), -1, -1,  0,  1, 
                          1,  1,  -1, 0, (-1, 0), (1, 0), -1]],
                         
                         
                  ["-b", [-1,  1, (-1, 0), (-1,  0),(-1, 0),-1, -1,  0,  1, 
                          1,  1,  -1, 0, (1, 0), (-1, 0), -1]]
                 ];
everythingy  = ["1a", "1b", "2", "3", "4a", "4b", "5a", "5b", "6", "7", "8", "9a", "9b", "9c", "0a", "0b", "-a", "-b"];
loopy        = ["8", "0a", "0b"];
liney        = ["1b", "-a", "-b"];
lefty        = ["1a", "3", "5a", "7", "-a", "-b"];
righty       = ["4a", "4b", "6", "9b", "0c", "-a", "-b"];
notReturny   = ["2", "5b", "6", "9a", "9b", "9c", "-a", "-b"];
startLoopy   = ["8", "9a", "9b", "9c",  "0c"]; //"0a", "0b",
endLoopy     = ["6", "8"]; //, "0a", "0b"
middleEndy   = ["6", "8"];
differenty   = everythingy -- lefty -- righty;
eps = 0.1;
between(a, c, d) := (a >= c) & (a <= d);
binom(n, k) := (
    if((n < 0) % (k < 0) % (k > n),
        err("binom: wrong numbers")
    , // else //
        faculty(n) / faculty(k) / faculty(n - k)
    );
);
bite(list, i) := list_((i + 1)..length(list));
bite(list) := bite(list, 1);
box(list) := (
    regional(bl, diag);
    
    bl   = min(list);
    diag = max(list) - bl;
    expandrect(bl, diag.x, diag.y);
);
computeangle(p, q, r) := (
    regional(x, y, s, w);
    
     x = p - q;
     y = r - q;
     s = (x * y) / (abs(x) * abs(y));
     s = if(s < -1, -1, if(s > 1, 1, s));
     w = arccos(s) + 0;
     
     if(perp(x) * y >= 0, w, 2*pi - w);   
);
consectriples(list) := (
    regional(res);
    res = [];
    if(length(list) <= 2,
        res = [];
    , // else //
        forall(1..(length(list) - 2),
            res = res :> list_[#, # + 1, # + 2];
        );
    );
);
const(n, x) := if(n == 0, [], apply(1..n, x));
expandrect(pos, c, w, h) := (
    regional(d, e, shift);
    
    d     = 0.5 * [w, h];
    e     = (d_1, -d_2);
    shift = compass()_c;
    shift = (0.5 * w * shift.x, 0.5 * h * shift.y);
    apply([-d, e, d, -e], pos + # + shift); //LU, RU, RO, LO
);
expandrect(pos, w, h) := expandrect(pos, 1, w, h);
compass() := apply(directproduct([1, 0, -1], [1, 0, -1]), reverse(#));
faculty(n) := if(n <= 0, 1, n * faculty(n - 1));
findin(list, x) := (
    regional(occs);
    
    occs = select(1..length(list), list_# == x);
    if(length(occs) == 0, 0, occs_1);
);
intersect(a, b) := (
      area(a_1, a_2, b_1) * area(a_1, a_2, b_2) < 0
    & area(b_1, b_2, a_1) * area(b_1, b_2, a_2) < 0
);
isconst(list) := (
         list == const(length(list), list_1);
);
isconst(list, x) := (
         list == const(length(list), x);
);
findperm(list1, list2) := (
    apply(list2, e, select(1..length(list1), list1_# == e)_1);
);
pop(list) := list_(1..(length(list) - 1));
randchoose(list) := list_(randomint(length(list)) + 1);
randomindex(n) := (
    regional(start, res, r);
    
	start = 1..n;
	res   = [];
	forall(1..n, 
		r     = randomint(n - # + 1) + 1;
		res   = res :> start_r;
		start = start -- res;		
	);
	res;
);
randsort(list) := list_(randomindex(length(list)));
triangleheight(a, b, x) := if(a ~= b, dist(x, a), 2 * area(a, b, x) / dist(a, b));
addNoise(list, delta) := (
    regional(average, r, phi);
    
    average = apply(consecutive(list), dist(#_1, #_2));
    average = sum(average) / length(average);
    apply(list,
        r   = random(delta * average);
        phi = random(2 * pi);
        # + r * (sin(phi), cos(phi));
    );
);
analyzestroke(list) := (
    regional(a, b, curvs, c, si, se);
    
    se = list_(-1) - list_1;
    se = if(se ~= (0,0), (0.1, 0.1), se);
    
    a     = list_3 - list_1;
    b     = list_(-1) - list_(-3);
    
    curvs = curvature(list);
    
    si = selfintersections(list);
    si = if(length(si) == 0,
        1.1;
    , // else //
        min(apply(si, dist(#.y, min(list).y) / dist(max(list).y, min(list).y)));
    );
    si = ceil(4 * si);
    [
     trajectory(list),
     se,
     a / abs(a),
     b / abs(b),
     leftrightratio(list),
     redgreenratio(list),
     startsize(list),
     endsize(list),
     si,
     sum(list) / length(list),
     deadlocks(list),
     relativestart(list),
     relativeend(list),
     0.25 * sum(box(list)),
     tomography(list, normDirect(list_1, list_(-1)), 50),
     tomography(list, (0, 1), 50);
    ];
);
awayfromstart(list) := (
    regional(sortedlist, ended, counter);
    
    sortedlist = sort(list, dist(list_1, #));
    
    ended   = false;
    counter = 0;
    forall(1..length(list), 
        if(!ended & (list_# == sortedlist_#),
            counter = counter + 1;
        , // else //
            ended = true;
        );
    );
    counter;
);
breakAt(x, a) := (
    if(x < a, 
        -1;
    , if(x > a, 
        1;
    , // else //
        a;
    ));
);
catmullRomSpline(list, s, alpha) := (
    regional(n, res);
    
    list = continuestroke(list, "start", 3) <: list :> continuestroke(list, "end", 3);
    
    n   = length(list) - 3;
    res = [];
    
    if(n < 4,
        list;
    , // else //
        forall(1..n,
            res = res ++ [list_(# + 1)] ++ catmullRomPiece(list_#, list_(# + 1), list_(# + 2), list_(# + 3), s, alpha);
        );
        res :> list_(-2);
    );
);
catmullRomPiece(p0, p1, p2, p3, s, alpha) := (
    regional(t0, t1, t2, t3, t, a1, a2, a3, b1, b2);
    
    t0 = 0;
    t1 = tj(t0, p0, p1, alpha);
    t2 = tj(t1, p1, p2, alpha);
    t3 = tj(t2, p2, p3, alpha);
    t  = apply(1..s, # * (t2 - t1) / (s + 1) + t1);
        
    apply(1..s,
        a1 = (t1 - t_#) / (t1 - t0) * p0 + (t_# - t0) / (t1 - t0) * p1;
        a2 = (t2 - t_#) / (t2 - t1) * p1 + (t_# - t1) / (t2 - t1) * p2;
        a3 = (t3 - t_#) / (t3 - t2) * p2 + (t_# - t2) / (t3 - t2) * p3;
        b1 = (t2 - t_#) / (t2 - t0) * a1 + (t_# - t0) / (t2 - t0) * a2;
        b2 = (t3 - t_#) / (t3 - t1) * a2 + (t_# - t1) / (t3 - t1) * a3;
        (t2 - t_#) / (t2 - t1) * b1 + (t_# - t1) / (t2 - t1) * b2; 
    );
);
tj(ti, pi, pj, alpha) := (
    dist(pi, pj)^alpha + ti;
);
circ(a, b, c) := (
    regional(m1, m2, p1, p2, mid, dist);
    m1   = (a + b) / 2;
    m2   = (b + c) / 2;
    p1   = perp(join(a, b), m1);
    p2   = perp(join(b, c), m2);
    mid  = meet(p1, p2);
    dist = if(mid.homog_3 == 0, 10000000, |mid.xy, a.xy|);
    (mid, dist);
);
closertoend(list) := awayfromstart(reverse(list));
continuestroke(list, mode, steps) := (
    regional(indices, current);
    
    indices = if(mode == "start",
        1
    , // else //
        if(mode == "end",
            -1
        , // else //
            err("continuestroke: wrong mode");
            0
        );
    ) * reverse(1..steps);        
    current = list_indices;
    sum(apply(1..steps, k, (-1)^(steps - k) * binom(steps, k - 1) * current_k));
);
curvature(list, steps) := (
    regional(r, dir1, dir2, ar, cur);
    apply((1 + steps)..(length(list) - steps),
        r = circ(list_(# - steps), list_#, list_(# + steps))_2;
        
        dir1 = list_# - list_(# - steps);
        dir2 = list_# - list_(# + steps);
        dir1 = dir1 / abs(dir1);
        dir2 = dir2 / abs(dir2);
        
        ar  = -det((dir1 , dir2));
        cur = if(ar > 0, 1, -1) / r;
        [#, abs(cur), cur, ar, dir1 * dir2];
    );
);
curvature(list) := curvature(list, 1);
deadlocks(list, eps) := (
    regional(flag, counter);
    
    flag    = false;
    counter = 0;
    forall(2..(length(list) - 1),
        if((list_(# - 1)).x < (list_#).x + eps & (list_(# + 1)).x < (list_#).x + eps,
            if(!flag, counter = counter + 1);
            flag = true;
        , // else //
            flag = false;
        );
    );
    
    counter;
);
deadlocks(list) := deadlocks(list, 0.001);
normDirect(a,b) := (b - a) / abs(b - a); 
dehook(list, mode, steps, threshold) := (
    regional(ref, angles, candi);
    
    if(length(list) < steps,
        list;
    , // else //
        if(mode == "start",
            ref    = normDirect(list_1, list_2);
            angles = apply(2..(steps + 1), ref * normDirect(list_#, list_(# + 1)));
            candi  = select(2..(steps + 1), angles_# <= cos(threshold));
            candi  = if(candi != [],
                candi_1;
            , // else //
                1;
            ); 
            
            list_(candi..length(list));
        ,
        if(mode == "end",
            reverse(dehook(reverse(list), "start", steps, threshold));
        ,
        if(mode == "both",
            dehook(dehook(list, "start", steps, threshold), "end", steps, threshold);
        , // else //
            err("dehook: wrong mode");    
        )));    
    );
);
derive(list) := apply(consecutive(list), #_2 - #_1);
diameter(list) := max(apply(pairs(list), dist(#_1, #_2)));
dimensions(list) := max(list) - min(list);
direction(list) := (list_(-1) - list_1) / dist(list_1, list_(-1));
endsize(list) := dist(list_(-1), list_(-closertoend(list))) / diameter(list);
equidist(list) := (
    regional(n, filled, cummdists, m, l, nop);
    
    n  = length(list);
    if(n < 4,
        list;
    , // else //
        filled    = catmullRomSpline(list, 2, 0.5);
        m         = length(filled);
        cummdists = apply(1..m, trajectory(filled_(1..#)));
        l         = cummdists_(-1);
        nop       = ceil(0.15 * l / eps);
        list_1 <: apply(2..nop,
            filled_(sort(2..m, i, dist(cummdists_i, (# - 1) * l / nop))_1);
        );    
    );    
);
fullGuess() := (
    regional(poi, deco, neighbours);    
        
    output = [];
    deco   = [];
        
    poi        = select((1..n) -- apply(output, #_1), contains(candidates_#_2, "4a"));
    neighbours = [];
    if(poi != [], 
        forall(poi, p,
            neighbours = select((1..n) -- deco, contains(candidates_#_2, "1b"));
            neighbours = select(neighbours, (dist((candidates_p_1).x, (candidates_#_1).x) < 3));
            neighbours = sort(neighbours, (dist((candidates_p_1).x, (candidates_#_1).x)));
            if(neighbours != [],
                output = output :> [p, "4"];
                deco   = deco   :> neighbours_1;
            , // else //
                output = output :> [p, (candidates_p_2 -- ["4a"])_1];
            );
        );        
    );  
    
    poi        = select((1..n) -- apply(output, #_1), contains(candidates_#_2, "5a") % contains(candidates_#_2, "5b"));
    neighbours = [];
    if(poi != [], 
        forall(poi, p,
            neighbours = select((1..n) -- deco, contains(candidates_#_2, "-a") % contains(candidates_#_2, "-b"));
            neighbours = select(neighbours, (dist((candidates_p_1).x, (candidates_#_1).x) < 3)
                                          & ((candidates_#_1).y - (candidates_p_1).y > 3));
            neighbours = sort(neighbours, (dist((candidates_p_1).x, (candidates_#_1).x)));
            if(neighbours != [],
                output = output :> [p, "5"];
                deco   = deco   :> neighbours_1;
            , // else //
                candidates_p_2 = candidates_p_2 -- ["5a"];     
                output = output :> [p, if(length(candidates_p_2) == 1,
                                           candidates_p_2_1;
                                       , // else //
                                           tiebreak(candidates_p_2_1, candidates_p_2_2, properties_p)_1;
                                       )];
            );
        );        
    ); 
    
    poi        = select((1..n) -- apply(output, #_1), contains(candidates_#_2, "7"));
    neighbours = [];
    if(poi != [], 
        forall(poi, p,
            neighbours = select((1..n) -- deco, contains(candidates_#_2, "-a") % contains(candidates_#_2, "-b"));
            neighbours = select(neighbours, (min(apply([candidates_#_1, strokelist_#_1, strokelist_#_(-1)], i, dist((candidates_p_1).x, i.x))) < 3)
                                          & (dist((candidates_p_1).y, (candidates_#_1).y) < 3));
            neighbours = sort(neighbours, (dist((candidates_p_1).x, (candidates_#_1).x)));
            if(neighbours != [],
                output = output :> [p, "7"];
                deco   = deco   :> neighbours_1;
            , // else //
                output = output :> [p, tiebreak(candidates_p_2_1, candidates_p_2_2, properties_p)_1];
            );
        );        
    ); 
    
    output = output ++ apply((1..n) -- apply(output, #_1) -- deco,
                           [#, tiebreak(candidates_#_2_1, candidates_#_2_2, properties_#)];
                       );    
    output = sort(output, (candidates_#_1).x);
    output = sum(apply(output, #_2_1));    
    
);
getPropOf(x) := select(strokedatabase, #_1 == x)_1_2;
isLoopy(prop)        := (prop_1 == 1);
isLiney(prop)        := (prop_2 == 1);
isLefty(prop)        := (prop_6 > 0.5);
isRighty(prop)       := (prop_7 > 0.5);
isStartLoopy(prop)   := (prop_9 < -0.85);
isNotReturny(prop)   := (prop_11 > 0.5);
isEndLoopy(prop)     := (prop_10 < -0.85);
isMiddleEndy(prop)   := (prop_16 == 1);
isDeadlockOney(prop) := (prop_12 == 1);
isDeadlockTwoy(prop) := (prop_12 == 2);
leftrightratio(list) := (
    regional(left, right);
    left  = length(pointsonleft(list));
    right = length(pointsonright(list));
    if(right + left == 0,
        0.5;
    , // else //
        left / (left + right);
    );
);
multProp(p, q) := apply(1..length(p), p_# * q_#);
pca(list) := (
   regional(n, mid, ev, ew, base);
   
   n     = length(list);
   cog   = sum(list) / n;
   list  = apply(list, # - cog);
   m     = transpose(list) * list;
   ev    = transpose(eigenvectors(m));
   ew    = eigenvalues(m);
   ew    = ew / |ew| * 10;
   base = [ev_1, ev_2];
   if(base_1_1 < 0, base_1 = -base_1);
   if(base_2_2 < 0, base_2 = -base_2);
   [ew_2 / 10, ev_2, ew_1 / ew_2, base, cog];
);
pointsonleft(list) := (
    select(list,
        triangleheight(list_1, list_(-1), #) > 0.4;
    );
);
pointsonright(list) := (
    select(list,
        triangleheight(list_1, list_(-1), #) < -0.4;
    );
);
processdata(input) := (
    regional(dehooked, features, properties, scores, n, orderedstrokes, candidates, weights, output, interpol, straightness, strokelist);
    
        
    interpol = select(input, length(#) > 1);
    n        = length(interpol);
    interpol = apply(interpol, addNoise(#, 0.25));
    interpol = apply(resizesymbol(interpol), equidist(#));
    
    straightness = apply(interpol, dist(#_(-1), #_1) / trajectory(#));
    
    interpol = apply(1..n,
        if(straightness_# < 0.2,
            smooth((interpol_#)_[-2, -1] ++ (interpol_#)_(3..(length(interpol_#) - 2)) ++ (interpol_#)_[1, 2], 1, "quad", 1);
        , // else //
            interpol_#;
        );
    );
    
    dehooked = apply(1..n, dehook(interpol_#, "both", ceil(0.1 * length(interpol_#) * (1 - 2 * abs(straightness_# - 0.5))), 90°));
    dehooked = 0.5 * apply(dehooked, 
        smooth(#, 1, "uni", if(length(#) < 8, 1, 5));
    ) + 0.5 * dehooked;
        
    output   = [];
    
    
    strokelist = dehooked; //apply(dehooked, continuestroke(#, "start", 2) <: # :> continuestroke(#, "end", 2));
    features = apply(strokelist, analyzestroke(#));
    
        
    weights = [
               1, 3, 5, 5, 3,
               1, 1, 5, 5, 5,
               3, 5, 1, 5, 5,
               1, 1
              ];
                        
    properties = apply(1..n,
        [
          if(scaleToPM(1 - abs(features_#_2) / features_#_1) > 0.7  % dist(features_#_12, features_#_13) < 0.5, 1, -1), // 1:  Loop
          breakAt(scaleToPM(1 - dist(features_#_1, abs(features_#_2)) / features_#_1), 0.9),                            // 2:  Line
          features_#_3,                                                                                                 // 3:  Start direction
          features_#_4,                                                                                                 // 4:  End direction
          features_#_2 / abs(features_#_2),                                                                             // 5:  General direction
          scaleToPM(features_#_5),                                                                                      // 6:  Left-ratio 
          scaleToPM(1 - features_#_5),                                                                                  // 7:  Right-ratio 
          scaleToPM(features_#_6),                                                                                      // 8:  Red-green-ratio
          scaleToPM(features_#_7),                                                                                      // 9:  Start size
          scaleToPM(features_#_8),                                                                                      // 10: End size
          features_#_3 * features_#_4,                                                                                  // 11: Start-end-angle
          breakAt(features_#_11, 1.5),                                                                                  // 12: Number of deadlocks
          features_#_9,                                                                                                 // 13: Lowest self-intersection
          features_#_12 / abs(features_#_12),                                                                           // 14: Relative start direction
          features_#_13 / abs(features_#_13),                                                                           // 15: Relative end direction
         -breakAt(abs(features_#_13), 0.7),                                                                             // 16: Relative end size
          features_#_15,                                                                                                // 17: SE-tomography
          features_#_16,                                                                                                // 18: vertical tomography
          0.5 * (features_#_10 + features_#_14);                                                                        // -1: Center
        ];                          
    );
           
    candidates = apply(1..n,
        if(isLoopy(properties_#),
            loopy;
        ,
        if(isLiney(properties_#),
            liney;
        ,
        if(isNotReturny(properties_#),
            notReturny;
        ,
        if(isLefty(properties_#),
            lefty;
        ,
        if(isRighty(properties_#),
            righty;
        ,
        if(isStartLoopy(properties_#),
            startLoopy;
        ,
        if(isMiddleEndy(properties_#),
            middleEndy;
        , 
            differenty;
        )))))))   //);
    );
    
    
    scores = apply(properties, p,   
          apply(strokedatabase, s, sum(apply([1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 16], weights_# * p_# * s_2_#)))
        + apply(strokedatabase, s, -weights_13 * breakAt(p_13, 4.5) * s_2_13)
        + apply(strokedatabase, s, sum(apply([3, 4, 14, 15], weights_# * scaleSP(p_# * s_2_#))));
    );
    
    orderedstrokes = apply(1..n,
        sort(1..length(strokedatabase), s,
            scores_#_s;
        );
    );
    
    candidates = apply(1..n,
        [properties_#_(-1), select(apply(strokedatabase_(orderedstrokes_#), s, s_1), t, contains(candidates_#, t))_[-2, -1]];
    );
    
    
    fullGuess();
      
    repaint();
    
    replace(output, "-", "?");
);
redgreenratio(list, threshold) := (
    regional(curvs);
    
    curvs = curvature(list);
    curvs = select(curvs, #_2 > threshold);
    if(length(curvs) == 0,
        0.5;
    , // else //
        length(select(curvs, #_3 > threshold)) / length(curvs);
    );    
);
redgreenratio(list) := redgreenratio(list, 0.1);
relativeend(list) := (
    regional(dims, pointer);
    
    dims    = 0.5 * dimensions(list);
    pointer = list_(-1) - 0.5 * (max(list) + min(list));
    [pointer_1 / dims_1, pointer_2 / dims_2];
);
relativestart(list) := (
    regional(dims, pointer);
    
    dims    = 0.5 * dimensions(list);
    pointer = list_1 - 0.5 * (max(list) + min(list));
    [pointer_1 / dims_1, pointer_2 / dims_2];
);
resizesymbol(list) := (
    regional(bbox, scale, center);
    bbox   = box(flatten(list));
    if(dist(bbox_1, bbox_4) > 0.2,
        scale  = 10 / dist(bbox_1, bbox_4);
        center = 0.5 * (bbox_1 + bbox_3);
        list   = apply(list, s, apply(s, # - center));
        apply(list, s, apply(s, center + scale * #));  
    , // else //
        list;
    );
);
scaleToPM(x) := (
    if((dist(x, 0.5) ~<= 0.5),
        2 * x - 1;
    , // else //
        err("scaleToPM: wrong input: " + x);
    );
);
scaleSP(x) := (
    if(x < 0, 
        -1;
    , 
    if(x > 0.5 * sqrt(2),
        1;
    , // else //
        x;
    ));
);
scoreFor(x) := (
    apply(scores, s, s_(findin(apply(strokedatabase, #_1), x)));
);
selfintersections(list) := (
    regional(allsegments, intersections);
    
    allsegments = consecutive(list);
    
    intersections = apply(allsegments, a,
        select(allsegments, b, 
              ((b ~~ a) == []) 
            & intersect(a, b);
        );
    );
    
    set(flatten(apply(1..length(allsegments), apply(intersections_#, i,
        meet(join(allsegments_#_1, allsegments_#_2), join(i_1, i_2)).xy
    ))));    
);
smooth(list, steps, mode) := (
    regional(l, j, weights);
    
    l       = length(list);
    weights = apply(1..l, i,
        if(mode == "quad",
            3 * 4 / l^2 * (i - 0.5 * l)^2 + 2;
        ,
        if(mode == "lin",
            2 / l * abs(i - 0.5 * l) + 1;
        ,
        if(mode == "uni",
            1/l;
        , // else //
            err("weight: wrong mode");
        )));
    );
    
    apply(1..l, i,
          sum(apply(-steps..steps, weights_(max(1, min(l, i + #))) * list_(max(1, min(l, i + #)))))
        / sum(apply(-steps..steps, weights_(max(1, min(l, i + #)))));
    );
);
smooth(list, steps, mode, iterations) := (
    regional(res);
    
    res = list;
    repeat(iterations,
        res = smooth(res, steps, mode);
    );
);
startsize(list) := dist(list_1, list_(awayfromstart(list))) / diameter(list);
straightness(list) := pca(list)_3;
tiebreak(x, y, prop) := (
    regional(res);
    
    res = if(sort([x,y]) == ["1a", "7"],                                     // 1a vs. 7
        sort([x, y], 
              1 * getPropOf(#)_3 * prop_3
            + 1 * getPropOf(#)_4 * prop_4
            + 1 * getPropOf(#)_5 * prop_5
        )_2;
    ,
    if((sort([x, y])_1 == "5b") & (indexof(sort([x,y])_2, "9") == 1),        // 5b vs. 9
        if(prop_9 < -0.4, ([x,y] -- ["5b"])_1, "5b");
    ,
    if((sort([x, y])_1 == "6") & (indexof(sort([x,y])_2, "9") == 1),         // 6 vs. 9
        if(prop_8 > 0.8, "6", ([x,y] -- ["6"])_1);
    ,
    if((sort([x, y])_1 == "4b") & (indexof(sort([x,y])_2, "9") == 1),        // 4b vs. 9
        if(prop_9 > -0.5, "4b", ([x,y] -- ["4b"])_1);
    ,
    if(sort([x, y]) == ["5b", "6"],                                          // 5b vs. 6
        if(prop_8 > 0.5, "6", "5b");
    ,
    if(sort([x, y]) == ["-b", "5b"],                                         // 5b vs. -b
        if(prop_2 == 1, "-b", "5b");
    ,
    if(sort([x_1, y_1]) == ["0", "8"],                                       // 0 vs. 8
        if((prop_13 <= 3) % (abs(prop_8) <= 0.2), "8", "0");
    ,
    if(sort([x, y]) == ["3", "7"],                                           // 3 vs. 7
        if((prop_12 == -1) & (prop_17 <= 2), "7", "3");
    ,
    if(sort([x, y]) == ["2", "4a"],                                          // 2 vs. 4a
        if(prop_3_1 > 0.5 * sqrt(2), "2", "4a");
    ,
    if(sort([x_1, y_1]) == ["0", "6"],                                       // 0 vs. 6
        if(prop_9 < -0.6, "0", "6");
    ,
    if(sort([x, y]) == ["-a", "2"],                                          // -a vs. 2
        if(prop_2 == 1, "-a", "2");
    , // else //
        y;
    )))))))))));
    
    res
);
tomography(list, cutter, nos) := (
    regional(dia, grid, center);
    
    dia    = diameter(list);
    cutter = cutter / abs(cutter);
    center = 0.25 * sum(box(list));
    grid   = apply(1..nos, 
        [center + dia * cutter + dia * perp(cutter) * (2 * # - nos - 1) / (nos - 1), 
         center - dia * cutter + dia * perp(cutter) * (2 * # - nos - 1) / (nos - 1)];
    );
    
     max(apply(grid, g, length(select(consecutive(list), s, intersect(g, s)))));
);
trajectory(list) := sum(apply(derive(list), abs(#)));
`);
	
	var scriptId = document.currentScript.dataset.scriptid;	
	if (!scriptId) scriptId = 'csinit';
	
	var scriptElement = document.getElementById(scriptId);
	if (!scriptElement) {
		scriptElement = document.createElement("script");
		scriptElement.id = scriptId;
		scriptElement.type = "text/x-cindyscript";
		document.head.appendChild(scriptElement);
	}
	if (scriptElement.firstChild) {
		scriptElement.insertBefore(code, scriptElement.firstChild);
	} else {
		scriptElement.appendChild(code);
	}
})();
