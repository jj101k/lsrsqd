Scenario 7
----------

0x2d [0x00]:

65

b621(0001)     c3a6b8 JP &b8a6
b624(0004)     c3cdbe JP &becd
b627(0007)     c34fc1 JP &c14f
b62a(000a)     c3e7c1 JP &c1e7
b62d(000d)         c9 RET
b630(0010)     c3e8fe JP &fee8
b633(0013)         c9 RET
b636(0016)         c9 RET
b639(0046)            ; DATA
b63a(0047)            ; DATA
b706(0113)            ; DATA
b711(011e)            ; DATA
b712(011f)            ; DATA
b713(0120)            ; DATA
b714(0121)            ; DATA
b715(0122)            ; DATA
b72c(0139)            ; DATA
b72e(013b)            ; DATA
b72f(013c)            ; DATA
b731(013e)            ; DATA
b732(0112)     322eb7 LD (&b72e),A
b735(0115)         4f LD C,A
b736(0116)     214fc6 LD HL,&c64f
b739(0119)     3a31b7 LD A,(&b731)
b73c(011c)         47 LD B,A
b73d(011d)         7e LD A,(HL)
b73e(011e)       e67f AND &7f
b740(0120)         5f LD E,A
b741(0121)       1600 LD D,&00
b743(0123)         19 ADD HL,DE
b744(0124)       10f7 DJNZ -7
b746(0126)         23 INC HL
b747(0127)     222fb7 LD (&b72f),HL
b74a(012a)         09 ADD HL,BC
b74b(012b)         09 ADD HL,BC
b74c(012c)         7e LD A,(HL)
b74d(012d)       cb7f BIT 7,A
b74f(012f)         c0 RET NZ
b750(0130)         e5 PUSH HL
b751(0131)     cd78b7 CALL &b778
b754(0134)         e1 POP HL
b755(0135)       200c JR NZ,14
b757(0137)     212eb7 LD HL,&b72e
b75a(013a)         34 INC (HL)
b75b(013b)         4e LD C,(HL)
b75c(013c)       0600 LD B,&00
b75e(013e)     2a2fb7 LD HL,(&b72f)
b761(0141)       18e7 JR -23
b763(0143)     3231b7 LD (&b731),A
b766(0146)         23 INC HL
b767(0147)   fd2a2cb7 LD IY,(&b72c)
b76b(014b)     fd7eff LD A,(IY+-1)
b76e(014e)         86 ADD A,(HL)
b76f(014f)     2187b7 LD HL,&b787
b772(0152)         be CP (HL)
b773(0153)       30e2 JR NC,-28
b775(0155)         47 LD B,A
b776(0156)         af XOR A
b777(0157)         c9 RET
b778(0158)     21015b LD HL,&5b01
b77b(015b)     110300 LD DE,&0003
b77e(015e)       0632 LD B,&32
b780(0160)         be CP (HL)
b781(0161)         c8 RET Z
b782(0162)         19 ADD HL,DE
b783(0163)       10fb DJNZ -3
b785(0165)         a7 AND A
b786(0166)         c9 RET
b787(0194)            ; DATA
b788(0195)            ; DATA
b789(0196)            ; DATA
b78a(0197)            ; DATA
b78b(0198)            ; DATA
b78c(016c)       3e00 LD A,&00
b78e(016e)     328bb7 LD (&b78b),A
b791(0171)     21015b LD HL,&5b01
b794(0174)     222cb7 LD (&b72c),HL
b797(0177)     21015b LD HL,&5b01
b79a(017a)       36ff LD (HL),&ff
b79c(017c)     11025b LD DE,&5b02
b79f(017f)     019500 LD BC,&0095
b7a2(0182)       edb0 LDIR
b7a4(0184)     3a88b7 LD A,(&b788)
b7a7(0187)     cd46b8 CALL &b846
b7aa(018a)     cd59b8 CALL &b859
b7ad(018d)     3282b8 LD (&b882),A
b7b0(0190)     3a89b7 LD A,(&b789)
b7b3(0193)     cd46b8 CALL &b846
b7b6(0196)     cd59b8 CALL &b859
b7b9(0199)     3283b8 LD (&b883),A
b7bc(019c)     2182b8 LD HL,&b882
b7bf(019f)         be CP (HL)
b7c0(01a0)       2004 JR NZ,6
b7c2(01a2)       3e1e LD A,&1e
b7c4(01a4)       1803 JR 5
b7c6(01a6)     cd84b8 CALL &b884
b7c9(01a9)     3287b7 LD (&b787),A
b7cc(01ac)         af XOR A
b7cd(01ad)     32005b LD (&5b00),A
b7d0(01b0)     328ab7 LD (&b78a),A
b7d3(01b3)     3a88b7 LD A,(&b788)
b7d6(01b6)     3231b7 LD (&b731),A
b7d9(01b9)     3a31b7 LD A,(&b731)
b7dc(01bc)     2a2cb7 LD HL,(&b72c)
b7df(01bf)         77 LD (HL),A
b7e0(01c0)     3a89b7 LD A,(&b789)
b7e3(01c3)         be CP (HL)
b7e4(01c4)       283f JR Z,65
b7e6(01c6)         23 INC HL
b7e7(01c7)         34 INC (HL)
b7e8(01c8)         7e LD A,(HL)
b7e9(01c9)         e5 PUSH HL
b7ea(01ca)     cd32b7 CALL &b732
b7ed(01cd)         e1 POP HL
b7ee(01ce)       2017 JR NZ,25
b7f0(01d0)     3a8ab7 LD A,(&b78a)
b7f3(01d3)       fe0f CP &0f
b7f5(01d5)       3010 JR NC,18
b7f7(01d7)     3a2eb7 LD A,(&b72e)
b7fa(01da)         77 LD (HL),A
b7fb(01db)         23 INC HL
b7fc(01dc)         70 LD (HL),B
b7fd(01dd)         23 INC HL
b7fe(01de)     222cb7 LD (&b72c),HL
b801(01e1)     218ab7 LD HL,&b78a
b804(01e4)         34 INC (HL)
b805(01e5)       18d2 JR -44
b807(01e7)     3a8ab7 LD A,(&b78a)
b80a(01ea)         b7 OR A
b80b(01eb)         c8 RET Z
b80c(01ec)     2a2cb7 LD HL,(&b72c)
b80f(01ef)         23 INC HL
b810(01f0)       36ff LD (HL),&ff
b812(01f2)         2b DEC HL
b813(01f3)       36ff LD (HL),&ff
b815(01f5)         2b DEC HL
b816(01f6)         2b DEC HL
b817(01f7)         2b DEC HL
b818(01f8)     222cb7 LD (&b72c),HL
b81b(01fb)         7e LD A,(HL)
b81c(01fc)     3231b7 LD (&b731),A
b81f(01ff)     218ab7 LD HL,&b78a
b822(0202)         35 DEC (HL)
b823(0203)       18b4 JR -74
b825(0205)         2b DEC HL
b826(0206)         7e LD A,(HL)
b827(0207)     3287b7 LD (&b787),A
b82a(020a)       3e01 LD A,&01
b82c(020c)     328bb7 LD (&b78b),A
b82f(020f)       060a LD B,&0a
b831(0211)     21015b LD HL,&5b01
b834(0214)   fd21f05c LD IY,&5cf0
b838(0218)     110300 LD DE,&0003
b83b(021b)         7e LD A,(HL)
b83c(021c)     fd7700 LD (IY+0),A
b83f(021f)       fd23 INC IY
b841(0221)         19 ADD HL,DE
b842(0222)       10f7 DJNZ -7
b844(0224)       18c1 JR -61
b846(0226)         3d DEC A
b847(0227)         6f LD L,A
b848(0228)       2600 LD H,&00
b84a(022a)         29 ADD HL,HL
b84b(022b)     1188c8 LD DE,&c888
b84e(022e)         19 ADD HL,DE
b84f(022f)         5e LD E,(HL)
b850(0230)         23 INC HL
b851(0231)         56 LD D,(HL)
b852(0232)   ed533a5d LD   (&5d3a),DE
b856(0236)         c9 RET
b859(0239)     2105c8 LD HL,&c805
b85c(023c)     110500 LD DE,&0005
b85f(023f)         e5 PUSH HL
b860(0240)     3a3a5d LD A,(&5d3a)
b863(0243)         be CP (HL)
b864(0244)       3813 JR C,21
b866(0246)         23 INC HL
b867(0247)         be CP (HL)
b868(0248)       300f JR NC,17
b86a(024a)         23 INC HL
b86b(024b)     3a3b5d LD A,(&5d3b)
b86e(024e)         be CP (HL)
b86f(024f)       3808 JR C,10
b871(0251)         23 INC HL
b872(0252)         be CP (HL)
b873(0253)       3004 JR NC,6
b875(0255)         23 INC HL
b876(0256)         7e LD A,(HL)
b877(0257)         e1 POP HL
b878(0258)         c9 RET
b882(028f)            ; DATA
b883(0290)            ; DATA
b884(0264)     3a82b8 LD A,(&b882)
b887(0267)         4f LD C,A
b888(0268)     2183b8 LD HL,&b883
b88b(026b)         46 LD B,(HL)
b88c(026c)         b8 CP B
b88d(026d)       2002 JR NZ,4
b88f(026f)         af XOR A
b890(0270)         c9 RET
b8a4(02b1)            ; DATA
b8a5(02b2)            ; DATA
b8a6(0286)     cd8567 CALL &6785
b8a9(0289)     cd2ab6 CALL &b62a
b8ac(028c)     21505c LD HL,&5c50
b8af(028f)       0614 LD B,&14
b8b1(0291)         c5 PUSH BC
b8b2(0292)         e5 PUSH HL
b8b3(0293)         7e LD A,(HL)
b8b4(0294)       fe01 CP &01
b8b6(0296)     c250ba JP NZ,&ba50
b8b9(0299)       3ea0 LD A,&a0
b8bb(029b)         90 SUB A,B
b8bc(029c)     32265d LD (&5d26),A
b8bf(029f)         23 INC HL
b8c0(02a0)         5e LD E,(HL)
b8c1(02a1)         23 INC HL
b8c2(02a2)         56 LD D,(HL)
b8c3(02a3)   ed53245d LD   (&5d24),DE
b8c7(02a7)     cd1261 CALL &6112
b8ca(02aa)     222f5d LD (&5d2f),HL
b8cd(02ad)     3a265d LD A,(&5d26)
b8d0(02b0)     cdc267 CALL &67c2
b8d3(02b3)   dd22335d LD (&5d33),IX
b8d7(02b7)     dd6e1a LD L,(IX+26)
b8da(02ba)       2600 LD H,&00
b8dc(02bc)         29 ADD HL,HL
b8dd(02bd)         29 ADD HL,HL
b8de(02be)         29 ADD HL,HL
b8df(02bf)     dd5e1a LD E,(IX+26)
b8e2(02c2)       1600 LD D,&00
b8e4(02c4)         19 ADD HL,DE
b8e5(02c5)         19 ADD HL,DE
b8e6(02c6)     115dc2 LD DE,&c25d
b8e9(02c9)         19 ADD HL,DE
b8ea(02ca)     2289ba LD (&ba89),HL
b8ed(02cd)       3e01 LD A,&01
b8ef(02cf)     32365d LD (&5d36),A
b8f2(02d2)     cd2ab6 CALL &b62a
b8f5(02d5)     cdd771 CALL &71d7
b8f8(02d8)     cd2a6c CALL &6c2a
b8fb(02db)         af XOR A
b8fc(02dc)     32375d LD (&5d37),A
b8ff(02df)     32625d LD (&5d62),A
b902(02e2)     dd7e24 LD A,(IX+36)
b905(02e5)         b7 OR A
b906(02e6)       2022 JR NZ,36
b908(02e8)     cd5d78 CALL &785d
b90b(02eb)     dd7e23 LD A,(IX+35)
b90e(02ee)     cddf67 CALL &67df
b911(02f1)   dd22c25d LD (&5dc2),IX
b915(02f5)     dd7e10 LD A,(IX+16)
b918(02f8)     cdab78 CALL &78ab
b91b(02fb)   dd2a335d LD IX,(&5d33)
b91f(02ff)       2009 JR NZ,11
b921(0301)     cde962 CALL &62e9
b924(0304)     cd019d CALL &9d01
b927(0307)     cd8b6a CALL &6a8b
b92a(030a)     3a595d LD A,(&5d59)
b92d(030d)         b7 OR A
b92e(030e)     c4e1bd CALL NZ,&bde1
b931(0311)     3a375d LD A,(&5d37)
b934(0314)         b7 OR A
b935(0315)     c250ba JP NZ,&ba50
b938(0318)     cd5fba CALL &ba5f
b93b(031b)     c202ba JP NZ,&ba02
b93e(031e)   fd2a89ba LD IY,(&ba89)
b942(0322)   fdcb085e rrc (iy+94)->b
b946(0326)     c2d2b9 JP NZ,&b9d2
b949(0329)     cdd9bf CALL &bfd9
b94c(032c)     3ad7bf LD A,(&bfd7)
b94f(032f)         b7 OR A
b950(0330)     cad2b9 JP Z,&b9d2
b953(0333)       d68c SUB A,&8c
b955(0335)         5f LD E,A
b956(0336)       1600 LD D,&00
b958(0338)     213ab6 LD HL,&b63a
b95b(033b)         19 ADD HL,DE
b95c(033c)         7e LD A,(HL)
b95d(033d)         b7 OR A
b95e(033e)     cad2b9 JP Z,&b9d2
b961(0341)     3ad7bf LD A,(&bfd7)
b964(0344)     cde7c0 CALL &c0e7
b967(0347)   ed533a5d LD   (&5d3a),DE
b96b(034b)     cdf6c0 CALL &c0f6
b96e(034e)     3a8f5d LD A,(&5d8f)
b971(0351)         b7 OR A
b972(0352)       285e JR Z,96
b974(0354)     cd69bd CALL &bd69
b977(0357)     3288b7 LD (&b788),A
b97a(035a)     3a8f5d LD A,(&5d8f)
b97d(035d)         47 LD B,A
b97e(035e)     210a5c LD HL,&5c0a
b981(0361)       3eff LD A,&ff
b983(0363)     32a4b8 LD (&b8a4),A
b986(0366)         c5 PUSH BC
b987(0367)         e5 PUSH HL
b988(0368)         7e LD A,(HL)
b989(0369)     3289b7 LD (&b789),A
b98c(036c)     cd8cb7 CALL &b78c
b98f(036f)     3a8bb7 LD A,(&b78b)
b992(0372)         b7 OR A
b993(0373)       2812 JR Z,20
b995(0375)     3a87b7 LD A,(&b787)
b998(0378)     21a4b8 LD HL,&b8a4
b99b(037b)         be CP (HL)
b99c(037c)       3009 JR NC,11
b99e(037e)     32a4b8 LD (&b8a4),A
b9a1(0381)     3a89b7 LD A,(&b789)
b9a4(0384)     32b2ba LD (&bab2),A
b9a7(0387)         e1 POP HL
b9a8(0388)         23 INC HL
b9a9(0389)         c1 POP BC
b9aa(038a)       10da DJNZ -36
b9ac(038c)     cdb4ba CALL &bab4
b9af(038f)     3a625d LD A,(&5d62)
b9b2(0392)         b7 OR A
b9b3(0393)       204d JR NZ,79
b9b5(0395)     3a375d LD A,(&5d37)
b9b8(0398)         b7 OR A
b9b9(0399)     c250ba JP NZ,&ba50
b9bc(039c)     3a595d LD A,(&5d59)
b9bf(039f)         b7 OR A
b9c0(03a0)     c4e1bd CALL NZ,&bde1
b9c3(03a3)     3a375d LD A,(&5d37)
b9c6(03a6)         b7 OR A
b9c7(03a7)     c250ba JP NZ,&ba50
b9ca(03aa)     cd5fba CALL &ba5f
b9cd(03ad)       2033 JR NZ,53
b9cf(03af)     c349b9 JP &b949
b9d2(03b2)   fd2a89ba LD IY,(&ba89)
b9d6(03b6)         af XOR A
b9d7(03b7)     32a5b8 LD (&b8a5),A
b9da(03ba)   fdcb0846 rrc (iy+70)->b
b9de(03be)       2014 JR NZ,22
b9e0(03c0)   fdcb084e rrc (iy+78)->b
b9e4(03c4)       2006 JR NZ,8
b9e6(03c6)     3a14b7 LD A,(&b714)
b9e9(03c9)         b7 OR A
b9ea(03ca)       2808 JR Z,10
b9ec(03cc)     dd7e05 LD A,(IX+5)
b9ef(03cf)       cb3f SRL A
b9f1(03d1)     32a5b8 LD (&b8a5),A
b9f4(03d4)     cd8bba CALL &ba8b
b9f7(03d7)     cd5fba CALL &ba5f
b9fa(03da)       2006 JR NZ,8
b9fc(03dc)     3a625d LD A,(&5d62)
b9ff(03df)         b7 OR A
ba00(03e0)       283d JR Z,63
ba02(03e2)     dd7e08 LD A,(IX+8)
ba05(03e5)         b7 OR A
ba06(03e6)       2848 JR Z,74
ba08(03e8)     3a13b7 LD A,(&b713)
ba0b(03eb)     cde7c0 CALL &c0e7
ba0e(03ee)   ed53daa5 LD   (&a5da),DE
ba12(03f2)     2a245d LD HL,(&5d24)
ba15(03f5)     22dca5 LD (&a5dc),HL
ba18(03f8)     cde0a5 CALL &a5e0
ba1b(03fb)     21005b LD HL,&5b00
ba1e(03fe)         5e LD E,(HL)
ba1f(03ff)         23 INC HL
ba20(0400)         56 LD D,(HL)
ba21(0401)   ed533a5d LD   (&5d3a),DE
ba25(0405)     cda9bc CALL &bca9
ba28(0408)         af XOR A
ba29(0409)     32625d LD (&5d62),A
ba2c(040c)     3a595d LD A,(&5d59)
ba2f(040f)         b7 OR A
ba30(0410)     ca49b9 JP Z,&b949
ba33(0413)     cde1bd CALL &bde1
ba36(0416)     3a375d LD A,(&5d37)
ba39(0419)         b7 OR A
ba3a(041a)       2014 JR NZ,22
ba3c(041c)     c349b9 JP &b949
ba50(0430)         e1 POP HL
ba51(0431)     110400 LD DE,&0004
ba54(0434)         19 ADD HL,DE
ba55(0435)         c1 POP BC
ba56(0436)         05 DEC B
ba57(0437)     c2b1b8 JP NZ,&b8b1
ba5a(043a)         af XOR A
ba5b(043b)     32365d LD (&5d36),A
ba5e(043e)         c9 RET
ba5f(043f)     21995b LD HL,&5b99
ba62(0442)         7e LD A,(HL)
ba63(0443)       feff CP &ff
ba65(0445)         c8 RET Z
ba66(0446)         e5 PUSH HL
ba67(0447)         f5 PUSH AF
ba68(0448)       d68c SUB A,&8c
ba6a(044a)         5f LD E,A
ba6b(044b)       1600 LD D,&00
ba6d(044d)     213ab6 LD HL,&b63a
ba70(0450)         19 ADD HL,DE
ba71(0451)         7e LD A,(HL)
ba72(0452)         b7 OR A
ba73(0453)       200b JR NZ,13
ba75(0455)         f1 POP AF
ba76(0456)         e1 POP HL
ba77(0457)         23 INC HL
ba78(0458)         7e LD A,(HL)
ba79(0459)       feff CP &ff
ba7b(045b)         c8 RET Z
ba7c(045c)         23 INC HL
ba7d(045d)         23 INC HL
ba7e(045e)       18e2 JR -28
ba80(0460)         f1 POP AF
ba81(0461)         e1 POP HL
ba82(0462)     3213b7 LD (&b713),A
ba85(0465)       3e01 LD A,&01
ba87(0467)         b7 OR A
ba88(0468)         c9 RET
ba89(0496)            ; DATA
ba8b(046b)         af XOR A
ba8c(046c)     32d7bf LD (&bfd7),A
ba8f(046f)     2a89ba LD HL,(&ba89)
ba92(0472)         5e LD E,(HL)
ba93(0473)       1600 LD D,&00
ba95(0475)         19 ADD HL,DE
ba96(0476)         7e LD A,(HL)
ba97(0477)     32b2ba LD (&bab2),A
ba9a(047a)         b7 OR A
ba9b(047b)       2007 JR NZ,9
ba9d(047d)     2a89ba LD HL,(&ba89)
baa0(0480)       3601 LD (HL),&01
baa2(0482)       18e7 JR -23
baa4(0484)     cdb4ba CALL &bab4
baa7(0487)     3ab3ba LD A,(&bab3)
baaa(048a)         b7 OR A
baab(048b)         c8 RET Z
baac(048c)     2a89ba LD HL,(&ba89)
baaf(048f)         34 INC (HL)
bab0(0490)       18d9 JR -37
bab2(04bf)            ; DATA
bab3(04c0)            ; DATA
bab4(0494)         af XOR A
bab5(0495)     32b3ba LD (&bab3),A
bab8(0498)     2a245d LD HL,(&5d24)
babb(049b)     cd44bd CALL &bd44
babe(049e)     21b2ba LD HL,&bab2
bac1(04a1)         be CP (HL)
bac2(04a2)       200c JR NZ,14
bac4(04a4)       3e01 LD A,&01
bac6(04a6)     32b3ba LD (&bab3),A
bac9(04a9)     3ad7bf LD A,(&bfd7)
bacc(04ac)         b7 OR A
bacd(04ad)       205e JR NZ,96
bacf(04af)         c9 RET
bca6(06b3)            ; DATA
bca7(06b4)            ; DATA
bca8(06b5)            ; DATA
bca9(0689)     2a3a5d LD HL,(&5d3a)
bcac(068c)     22dca5 LD (&a5dc),HL
bcaf(068f)     dd7e21 LD A,(IX+33)
bcb2(0692)     32a6bc LD (&bca6),A
bcb5(0695)         af XOR A
bcb6(0696)     32a8bc LD (&bca8),A
bcb9(0699)     3aa6bc LD A,(&bca6)
bcbc(069c)     cd746e CALL &6e74
bcbf(069f)     2adca5 LD HL,(&a5dc)
bcc2(06a2)   ed5b3a5d LD   DE,(&5d3a)
bcc6(06a6)         a7 AND A
bcc7(06a7)       ed52 SBC  HL,DE
bcc9(06a9)       2815 JR Z,23
bccb(06ab)     21a8bc LD HL,&bca8
bcce(06ae)         34 INC (HL)
bccf(06af)     3aa6bc LD A,(&bca6)
bcd2(06b2)         3c INC A
bcd3(06b3)     32a6bc LD (&bca6),A
bcd6(06b6)       fe08 CP &08
bcd8(06b8)       38df JR C,-31
bcda(06ba)         af XOR A
bcdb(06bb)     32a6bc LD (&bca6),A
bcde(06be)       18d9 JR -37
bce0(06c0)         af XOR A
bce1(06c1)     32a7bc LD (&bca7),A
bce4(06c4)     dd7e21 LD A,(IX+33)
bce7(06c7)     32a6bc LD (&bca6),A
bcea(06ca)     3aa6bc LD A,(&bca6)
bced(06cd)     cd746e CALL &6e74
bcf0(06d0)     2adca5 LD HL,(&a5dc)
bcf3(06d3)   ed5b3a5d LD   DE,(&5d3a)
bcf7(06d7)         a7 AND A
bcf8(06d8)       ed52 SBC  HL,DE
bcfa(06da)       2816 JR Z,24
bcfc(06dc)     21a7bc LD HL,&bca7
bcff(06df)         34 INC (HL)
bd00(06e0)     3aa6bc LD A,(&bca6)
bd03(06e3)         3d DEC A
bd04(06e4)     32a6bc LD (&bca6),A
bd07(06e7)       feff CP &ff
bd09(06e9)       20df JR NZ,-31
bd0b(06eb)       3e07 LD A,&07
bd0d(06ed)     32a6bc LD (&bca6),A
bd10(06f0)       18d8 JR -38
bd12(06f2)     3aa8bc LD A,(&bca8)
bd15(06f5)         b7 OR A
bd16(06f6)       2826 JR Z,40
bd18(06f8)     21a7bc LD HL,&bca7
bd1b(06fb)         be CP (HL)
bd1c(06fc)       3811 JR C,19
bd1e(06fe)     3aa7bc LD A,(&bca7)
bd21(0701)         47 LD B,A
bd22(0702)         c5 PUSH BC
bd23(0703)     cdde6d CALL &6dde
bd26(0706)         c1 POP BC
bd27(0707)     cdb6bd CALL &bdb6
bd2a(070a)         c8 RET Z
bd2b(070b)       10f5 DJNZ -9
bd2d(070d)       180f JR 17
bd2f(070f)     3aa8bc LD A,(&bca8)
bd32(0712)         47 LD B,A
bd33(0713)         c5 PUSH BC
bd34(0714)     cdaf6d CALL &6daf
bd37(0717)         c1 POP BC
bd38(0718)     cdb6bd CALL &bdb6
bd3b(071b)         c8 RET Z
bd3c(071c)       10f5 DJNZ -9
bd3e(071e)       3e01 LD A,&01
bd40(0720)         b7 OR A
bd41(0721)         c9 RET
bd42(074f)            ; DATA
bd43(0750)            ; DATA
bd44(0724)     2242bd LD (&bd42),HL
bd47(0727)     2188c8 LD HL,&c888
bd4a(072a)     3a20c2 LD A,(&c220)
bd4d(072d)         47 LD B,A
bd4e(072e)     3a42bd LD A,(&bd42)
bd51(0731)         be CP (HL)
bd52(0732)       200d JR NZ,15
bd54(0734)         23 INC HL
bd55(0735)     3a43bd LD A,(&bd43)
bd58(0738)         be CP (HL)
bd59(0739)       2007 JR NZ,9
bd5b(073b)     3a20c2 LD A,(&c220)
bd5e(073e)         3c INC A
bd5f(073f)         90 SUB A,B
bd60(0740)         c9 RET
bd67(0774)            ; DATA
bd68(0775)            ; DATA
bd69(0749)     2a245d LD HL,(&5d24)
bd6c(074c)     cd44bd CALL &bd44
bd6f(074f)         b7 OR A
bd70(0750)         c0 RET NZ
bd71(0751)     2a245d LD HL,(&5d24)
bd74(0754)     224ba5 LD (&a54b),HL
bd77(0757)     22475d LD (&5d47),HL
bd7a(075a)       3eff LD A,&ff
bd7c(075c)     3268bd LD (&bd68),A
bd7f(075f)     3a20c2 LD A,(&c220)
bd82(0762)         47 LD B,A
bd83(0763)     2188c8 LD HL,&c888
bd86(0766)         e5 PUSH HL
bd87(0767)         c5 PUSH BC
bd88(0768)         5e LD E,(HL)
bd89(0769)         23 INC HL
bd8a(076a)         56 LD D,(HL)
bd8b(076b)   ed534da5 LD   (&a54d),DE
bd8f(076f)   ed53495d LD   (&5d49),DE
bd93(0773)     cd0172 CALL &7201
bd96(0776)         c1 POP BC
bd97(0777)       2014 JR NZ,22
bd99(0779)     cd50a5 CALL &a550
bd9c(077c)     2168bd LD HL,&bd68
bd9f(077f)         be CP (HL)
bda0(0780)       300b JR NC,13
bda2(0782)     3268bd LD (&bd68),A
bda5(0785)     3a20c2 LD A,(&c220)
bda8(0788)         3c INC A
bda9(0789)         90 SUB A,B
bdaa(078a)     3267bd LD (&bd67),A
bdad(078d)         e1 POP HL
bdae(078e)         23 INC HL
bdaf(078f)         23 INC HL
bdb0(0790)       10d4 DJNZ -42
bdb2(0792)     3a67bd LD A,(&bd67)
bdb5(0795)         c9 RET
bdb6(0796)     dd7e06 LD A,(IX+6)
bdb9(0799)         b7 OR A
bdba(079a)       2814 JR Z,22
bdbc(079c)     21a5b8 LD HL,&b8a5
bdbf(079f)         96 SUB A,(HL)
bdc0(07a0)       280e JR Z,16
bdc2(07a2)     dd7e08 LD A,(IX+8)
bdc5(07a5)         b7 OR A
bdc6(07a6)       2808 JR Z,10
bdc8(07a8)     3a595d LD A,(&5d59)
bdcb(07ab)         b7 OR A
bdcc(07ac)       2009 JR NZ,11
bdce(07ae)         3c INC A
bdcf(07af)         c9 RET
bdde(07eb)            ; DATA
bde0(07ed)            ; DATA
bde1(07c1)     cdd771 CALL &71d7
bde4(07c4)       3e01 LD A,&01
bde6(07c6)     3214b7 LD (&b714),A
bde9(07c9)       0608 LD B,&08
bdeb(07cb)     2a245d LD HL,(&5d24)
bdee(07ce)     22dca5 LD (&a5dc),HL
bdf1(07d1)     21caa5 LD HL,&a5ca
bdf4(07d4)     22dea5 LD (&a5de),HL
bdf7(07d7)     21005b LD HL,&5b00
bdfa(07da)     22fb5d LD (&5dfb),HL
bdfd(07dd)         c5 PUSH BC
bdfe(07de)     2adca5 LD HL,(&a5dc)
be01(07e1)     22245d LD (&5d24),HL
be04(07e4)     2adea5 LD HL,(&a5de)
be07(07e7)     3a245d LD A,(&5d24)
be0a(07ea)         86 ADD A,(HL)
be0b(07eb)     323a5d LD (&5d3a),A
be0e(07ee)         23 INC HL
be0f(07ef)     3a255d LD A,(&5d25)
be12(07f2)         86 ADD A,(HL)
be13(07f3)     323b5d LD (&5d3b),A
be16(07f6)         23 INC HL
be17(07f7)     22dea5 LD (&a5de),HL
be1a(07fa)   ed5b3a5d LD   DE,(&5d3a)
be1e(07fe)   ed53245d LD   (&5d24),DE
be22(0802)     2afb5d LD HL,(&5dfb)
be25(0805)         73 LD (HL),E
be26(0806)         23 INC HL
be27(0807)         72 LD (HL),D
be28(0808)         23 INC HL
be29(0809)     22fb5d LD (&5dfb),HL
be2c(080c)     cd1261 CALL &6112
be2f(080f)     223e5d LD (&5d3e),HL
be32(0812)     cd6a72 CALL &726a
be35(0815)     3a975b LD A,(&5b97)
be38(0818)       feff CP &ff
be3a(081a)       2022 JR NZ,36
be3c(081c)     2a3e5d LD HL,(&5d3e)
be3f(081f)         7e LD A,(HL)
be40(0820)       fe8c CP &8c
be42(0822)       301a JR NC,28
be44(0824)     cd4a6b CALL &6b4a
be47(0827)     cdf767 CALL &67f7
be4a(082a)     dd5e04 LD E,(IX+4)
be4d(082d)       1600 LD D,&00
be4f(082f)       fd19 ADD IY,DE
be51(0831)     fd7e00 LD A,(IY+0)
be54(0834)       feff CP &ff
be56(0836)       2806 JR Z,8
be58(0838)     2afb5d LD HL,(&5dfb)
be5b(083b)         77 LD (HL),A
be5c(083c)       1805 JR 7
be5e(083e)     2afb5d LD HL,(&5dfb)
be61(0841)       36ff LD (HL),&ff
be63(0843)         23 INC HL
be64(0844)     22fb5d LD (&5dfb),HL
be67(0847)         c1 POP BC
be68(0848)       1093 DJNZ -107
be6a(084a)       3e07 LD A,&07
be6c(084c)     32fd5d LD (&5dfd),A
be6f(084f)     21005b LD HL,&5b00
be72(0852)     2278a5 LD (&a578),HL
be75(0855)     cd7aa5 CALL &a57a
be78(0858)     2a005b LD HL,(&5b00)
be7b(085b)     22debd LD (&bdde),HL
be7e(085e)     3a025b LD A,(&5b02)
be81(0861)         3c INC A
be82(0862)     32e0bd LD (&bde0),A
be85(0865)     2adca5 LD HL,(&a5dc)
be88(0868)     22245d LD (&5d24),HL
be8b(086b)     cd24b6 CALL &b624
be8e(086e)   dd2a335d LD IX,(&5d33)
be92(0872)     3a595d LD A,(&5d59)
be95(0875)         b7 OR A
be96(0876)         c8 RET Z
be97(0877)     3ae0bd LD A,(&bde0)
be9a(087a)         b7 OR A
be9b(087b)         c8 RET Z
be9c(087c)   ed5b245d LD   DE,(&5d24)
bea0(0880)     cd1261 CALL &6112
bea3(0883)     dd7e16 LD A,(IX+22)
bea6(0886)         77 LD (HL),A
bea7(0887)   ed5bdebd LD   DE,(&bdde)
beab(088b)   ed53245d LD   (&5d24),DE
beaf(088f)     cd1261 CALL &6112
beb2(0892)     222f5d LD (&5d2f),HL
beb5(0895)         46 LD B,(HL)
beb6(0896)     3a265d LD A,(&5d26)
beb9(0899)         77 LD (HL),A
beba(089a)     dd7016 LD (IX+22),B
bebd(089d)     dd3606 LD (IX+0),&06
bec0(08a0)         00 NOP
bec1(08a1)     cdc174 CALL &74c1
bec4(08a4)       3e01 LD A,&01
bec6(08a6)     32375d LD (&5d37),A
bec9(08a9)     cd2ab6 CALL &b62a
becc(08ac)         c9 RET
becd(08ad)     cdcf99 CALL &99cf
bed0(08b0)     cdd771 CALL &71d7
bed3(08b3)   dd2a335d LD IX,(&5d33)
bed7(08b7)     dd7e24 LD A,(IX+36)
beda(08ba)         b7 OR A
bedb(08bb)       2006 JR NZ,8
bedd(08bd)       3e01 LD A,&01
bedf(08bf)     32375d LD (&5d37),A
bee2(08c2)         c9 RET
bfd7(09e4)            ; DATA
bfd8(09e5)            ; DATA
bfd9(09b9)     3a265d LD A,(&5d26)
bfdc(09bc)         f5 PUSH AF
bfdd(09bd)     2a245d LD HL,(&5d24)
bfe0(09c0)     223a5d LD (&5d3a),HL
bfe3(09c3)     cd59b8 CALL &b859
bfe6(09c6)     3282b8 LD (&b882),A
bfe9(09c9)     21ff5a LD HL,&5aff
bfec(09cc)     22fb5d LD (&5dfb),HL
bfef(09cf)       3e8b LD A,&8b
bff1(09d1)     32265d LD (&5d26),A
bff4(09d4)     3a265d LD A,(&5d26)
bff7(09d7)         3c INC A
bff8(09d8)       fea0 CP &a0
bffa(09da)     cab8c0 JP Z,&c0b8
bffd(09dd)     2afb5d LD HL,(&5dfb)
c000(09e0)         23 INC HL
c001(09e1)         77 LD (HL),A
c002(09e2)         23 INC HL
c003(09e3)       3600 LD (HL),&00
c005(09e5)     22fb5d LD (&5dfb),HL
c008(09e8)     32265d LD (&5d26),A
c00b(09eb)     cdc267 CALL &67c2
c00e(09ee)   ddcb2546 sla (IX+70)->l
c012(09f2)       20e0 JR NZ,-30
c014(09f4)     dd7e08 LD A,(IX+8)
c017(09f7)         b7 OR A
c018(09f8)       28da JR Z,-36
c01a(09fa)     3a265d LD A,(&5d26)
c01d(09fd)     cde7c0 CALL &c0e7
c020(0a00)   ed533a5d LD   (&5d3a),DE
c024(0a04)     cd59b8 CALL &b859
c027(0a07)         b7 OR A
c028(0a08)       28ca JR Z,-52
c02a(0a0a)     3283b8 LD (&b883),A
c02d(0a0d)     dd7e27 LD A,(IX+39)
c030(0a10)     2afb5d LD HL,(&5dfb)
c033(0a13)         77 LD (HL),A
c034(0a14)     cd5d78 CALL &785d
c037(0a17)     3a8f5d LD A,(&5d8f)
c03a(0a1a)         b7 OR A
c03b(0a1b)       281f JR Z,33
c03d(0a1d)         47 LD B,A
c03e(0a1e)     217a5b LD HL,&5b7a
c041(0a21)         e5 PUSH HL
c042(0a22)         7e LD A,(HL)
c043(0a23)       d66e SUB A,&6e
c045(0a25)         5f LD E,A
c046(0a26)       1600 LD D,&00
c048(0a28)     2135c2 LD HL,&c235
c04b(0a2b)         19 ADD HL,DE
c04c(0a2c)         7e LD A,(HL)
c04d(0a2d)     2afb5d LD HL,(&5dfb)
c050(0a30)         86 ADD A,(HL)
c051(0a31)       3002 JR NC,4
c053(0a33)       3eff LD A,&ff
c055(0a35)         77 LD (HL),A
c056(0a36)         e1 POP HL
c057(0a37)         23 INC HL
c058(0a38)         23 INC HL
c059(0a39)         23 INC HL
c05a(0a3a)       10e5 DJNZ -25
c05c(0a3c)   fd2a89ba LD IY,(&ba89)
c060(0a40)     fd7e09 LD A,(IY+9)
c063(0a43)         6f LD L,A
c064(0a44)       2600 LD H,&00
c066(0a46)         29 ADD HL,HL
c067(0a47)         29 ADD HL,HL
c068(0a48)         29 ADD HL,HL
c069(0a49)         29 ADD HL,HL
c06a(0a4a)         29 ADD HL,HL
c06b(0a4b)     3a83b8 LD A,(&b883)
c06e(0a4e)         3d DEC A
c06f(0a4f)         5f LD E,A
c070(0a50)       1600 LD D,&00
c072(0a52)         19 ADD HL,DE
c073(0a53)     1121c2 LD DE,&c221
c076(0a56)         19 ADD HL,DE
c077(0a57)         7e LD A,(HL)
c078(0a58)         b7 OR A
c079(0a59)       2008 JR NZ,10
c07b(0a5b)     2afb5d LD HL,(&5dfb)
c07e(0a5e)       3600 LD (HL),&00
c080(0a60)     c3f4bf JP &bff4
c0b8(0a98)         f1 POP AF
c0b9(0a99)     32265d LD (&5d26),A
c0bc(0a9c)   fd21005b LD IY,&5b00
c0c0(0aa0)       0614 LD B,&14
c0c2(0aa2)         af XOR A
c0c3(0aa3)     32d7bf LD (&bfd7),A
c0c6(0aa6)     32d8bf LD (&bfd8),A
c0c9(0aa9)     110200 LD DE,&0002
c0cc(0aac)     fd7e01 LD A,(IY+1)
c0cf(0aaf)     21d8bf LD HL,&bfd8
c0d2(0ab2)         be CP (HL)
c0d3(0ab3)       3809 JR C,11
c0d5(0ab5)     32d8bf LD (&bfd8),A
c0d8(0ab8)     fd7e00 LD A,(IY+0)
c0db(0abb)     32d7bf LD (&bfd7),A
c0de(0abe)       fd19 ADD IY,DE
c0e0(0ac0)       10ea DJNZ -20
c0e2(0ac2)   dd2a335d LD IX,(&5d33)
c0e6(0ac6)         c9 RET
c0e7(0ac7)       d68c SUB A,&8c
c0e9(0ac9)         6f LD L,A
c0ea(0aca)       2600 LD H,&00
c0ec(0acc)         29 ADD HL,HL
c0ed(0acd)         29 ADD HL,HL
c0ee(0ace)     11515c LD DE,&5c51
c0f1(0ad1)         19 ADD HL,DE
c0f2(0ad2)         5e LD E,(HL)
c0f3(0ad3)         23 INC HL
c0f4(0ad4)         56 LD D,(HL)
c0f5(0ad5)         c9 RET
c0f6(0ad6)     2a3a5d LD HL,(&5d3a)
c0f9(0ad9)     22475d LD (&5d47),HL
c0fc(0adc)         af XOR A
c0fd(0add)     328f5d LD (&5d8f),A
c100(0ae0)     210a5c LD HL,&5c0a
c103(0ae3)     22fb5d LD (&5dfb),HL
c106(0ae6)         3c INC A
c107(0ae7)     328ab7 LD (&b78a),A
c10a(0aea)     2a3a5d LD HL,(&5d3a)
c10d(0aed)     cd44bd CALL &bd44
c110(0af0)         b7 OR A
c111(0af1)       280d JR Z,15
c113(0af3)     2afb5d LD HL,(&5dfb)
c116(0af6)         77 LD (HL),A
c117(0af7)         23 INC HL
c118(0af8)     22fb5d LD (&5dfb),HL
c11b(0afb)       3e01 LD A,&01
c11d(0afd)     328f5d LD (&5d8f),A
c120(0b00)     2188c8 LD HL,&c888
c123(0b03)     3a20c2 LD A,(&c220)
c126(0b06)         47 LD B,A
c127(0b07)         c5 PUSH BC
c128(0b08)         e5 PUSH HL
c129(0b09)         5e LD E,(HL)
c12a(0b0a)         23 INC HL
c12b(0b0b)         56 LD D,(HL)
c12c(0b0c)   ed53495d LD   (&5d49),DE
c130(0b10)     cd0972 CALL &7209
c133(0b13)       200f JR NZ,17
c135(0b15)     2afb5d LD HL,(&5dfb)
c138(0b18)     3a8ab7 LD A,(&b78a)
c13b(0b1b)         77 LD (HL),A
c13c(0b1c)         23 INC HL
c13d(0b1d)     22fb5d LD (&5dfb),HL
c140(0b20)     218f5d LD HL,&5d8f
c143(0b23)         34 INC (HL)
c144(0b24)     218ab7 LD HL,&b78a
c147(0b27)         34 INC (HL)
c148(0b28)         e1 POP HL
c149(0b29)         23 INC HL
c14a(0b2a)         23 INC HL
c14b(0b2b)         c1 POP BC
c14c(0b2c)       10d9 DJNZ -37
c14e(0b2e)         c9 RET
c14f(0b2f)   ed5b245d LD   DE,(&5d24)
c153(0b33)         d5 PUSH DE
c154(0b34)     22245d LD (&5d24),HL
c157(0b37)     cd6a72 CALL &726a
c15a(0b3a)     3a975b LD A,(&5b97)
c15d(0b3d)       feff CP &ff
c15f(0b3f)       2815 JR Z,23
c161(0b41)     3a265d LD A,(&5d26)
c164(0b44)       d68c SUB A,&8c
c166(0b46)         5f LD E,A
c167(0b47)       1600 LD D,&00
c169(0b49)     213ab6 LD HL,&b63a
c16c(0b4c)         19 ADD HL,DE
c16d(0b4d)     3af85d LD A,(&5df8)
c170(0b50)         77 LD (HL),A
c171(0b51)       3e01 LD A,&01
c173(0b53)     3214b7 LD (&b714),A
c176(0b56)     2ad85d LD HL,(&5dd8)
c179(0b59)     229170 LD (&7091),HL
c17c(0b5c)     2ad65d LD HL,(&5dd6)
c17f(0b5f)     229370 LD (&7093),HL
c182(0b62)         d1 POP DE
c183(0b63)   ed53245d LD   (&5d24),DE
c187(0b67)         c9 RET
c1e7(0bc7)     3a15b7 LD A,(&b715)
c1ea(0bca)         b7 OR A
c1eb(0bcb)         c0 RET NZ
c1ec(0bcc)     210101 LD HL,&0101
c1ef(0bcf)     22fe5c LD (&5cfe),HL
c1f2(0bd2)       060b LD B,&0b
c1f4(0bd4)         c5 PUSH BC
c1f5(0bd5)       060b LD B,&0b
c1f7(0bd7)         c5 PUSH BC
c1f8(0bd8)         af XOR A
c1f9(0bd9)     32005d LD (&5d00),A
c1fc(0bdc)     cdaf60 CALL &60af
c1ff(0bdf)     21ff5c LD HL,&5cff
c202(0be2)         34 INC (HL)
c203(0be3)         34 INC (HL)
c204(0be4)         c1 POP BC
c205(0be5)       10f0 DJNZ -14
c207(0be7)     3afe5c LD A,(&5cfe)
c20a(0bea)       c602 ADD A,&02
c20c(0bec)     32fe5c LD (&5cfe),A
c20f(0bef)       3e01 LD A,&01
c211(0bf1)     32ff5c LD (&5cff),A
c214(0bf4)         c1 POP BC
c215(0bf5)       10dd DJNZ -33
c217(0bf7)     3215b7 LD (&b715),A
c21a(0bfa)       3e65 LD A,&65
c21c(0bfc)     cd5e67 CALL &675e
c21f(0bff)         c9 RET
c220(0c2d)            ; DATA
c235(0c42)            ; DATA
c25d(0c6a)            ; DATA

0x0d7b [0xd4e]: String offsets

0x0ef2 [0xec5]: Strings

c64f(105c)            ; DATA
c805(1212)            ; DATA
c888(1295)            ; DATA
d292(1c72)     3a11b7 LD A,(&b711)
d295(1c75)       fe01 CP &01
d297(1c77)         c0 RET NZ
d298(1c78)     3a12b7 LD A,(&b712)
d29b(1c7b)         b7 OR A
d29c(1c7c)         c0 RET NZ
d29d(1c7d)       3e04 LD A,&04
d29f(1c7f)     32e2fe LD (&fee2),A
d2a2(1c82)     3a06b7 LD A,(&b706)
d2a5(1c85)         b7 OR A
d2a6(1c86)       2007 JR NZ,9
d2a8(1c88)       3e04 LD A,&04
d2aa(1c8a)     32e3fe LD (&fee3),A
d2ad(1c8d)       180c JR 14
d2af(1c8f)     3af85d LD A,(&5df8)
d2b2(1c92)       cb3f SRL A
d2b4(1c94)         47 LD B,A
d2b5(1c95)       3e04 LD A,&04
d2b7(1c97)         90 SUB A,B
d2b8(1c98)     32e3fe LD (&fee3),A
d2bb(1c9b)     21acd3 LD HL,&d3ac
d2be(1c9e)     cdf2ff CALL &fff2
d2c1(1ca1)     213cd5 LD HL,&d53c
d2c4(1ca4)     cdf2ff CALL &fff2
d2c7(1ca7)       060a LD B,&0a
d2c9(1ca9)     214cd5 LD HL,&d54c
d2cc(1cac)     112500 LD DE,&0025
d2cf(1caf)       3626 LD (HL),&26
d2d1(1cb1)         23 INC HL
d2d2(1cb2)       3603 LD (HL),&03
d2d4(1cb4)         23 INC HL
d2d5(1cb5)       3646 LD (HL),&46
d2d7(1cb7)         23 INC HL
d2d8(1cb8)       3608 LD (HL),&08
d2da(1cba)         19 ADD HL,DE
d2db(1cbb)       10f2 DJNZ -12
d2dd(1cbd)       3e06 LD A,&06
d2df(1cbf)     329b5d LD (&5d9b),A
d2e2(1cc2)     215dc2 LD HL,&c25d
d2e5(1cc5)       060a LD B,&0a
d2e7(1cc7)     cdb180 CALL &80b1
d2ea(1cca)         3c INC A
d2eb(1ccb)         77 LD (HL),A
d2ec(1ccc)     110a00 LD DE,&000a
d2ef(1ccf)         19 ADD HL,DE
d2f0(1cd0)       10f5 DJNZ -9
d2f2(1cd2)         c9 RET
d3ac(1db9)            ; DATA
d53c(1f49)            ; DATA
d54c(1f59)            ; DATA

0x20cc-0x306b?: Map data
0x306c-0x32eb?: Sprite offsets
0x32ec-?: Sprites

fee0(48ed)            ; DATA
fee1(48ee)            ; DATA
fee2(48ef)            ; DATA
fee3(48f0)            ; DATA
fee4(48f1)            ; DATA
fee5(48f2)            ; DATA
fee6(48f3)            ; DATA
fee7(48f4)            ; DATA
fee8(48c8)     cd92d2 CALL &d292
feeb(48cb)     3ae0fe LD A,(&fee0)
feee(48ce)     21e1fe LD HL,&fee1
fef1(48d1)         86 ADD A,(HL)
fef2(48d2)     21e7fe LD HL,&fee7
fef5(48d5)         86 ADD A,(HL)
fef6(48d6)     21e6fe LD HL,&fee6
fef9(48d9)         be CP (HL)
fefa(48da)       3032 JR NC,52
fefc(48dc)     3a12b7 LD A,(&b712)
feff(48df)         b7 OR A
ff00(48e0)       2017 JR NZ,25
ff02(48e2)     3ae4fe LD A,(&fee4)
ff05(48e5)         3c INC A
ff06(48e6)     32e4fe LD (&fee4),A
ff09(48e9)     21e2fe LD HL,&fee2
ff0c(48ec)         be CP (HL)
ff0d(48ed)       201f JR NZ,33
ff0f(48ef)     21e0fe LD HL,&fee0
ff12(48f2)         34 INC (HL)
ff13(48f3)         af XOR A
ff14(48f4)     32e4fe LD (&fee4),A
ff17(48f7)       1815 JR 23
ff19(48f9)     3ae5fe LD A,(&fee5)
ff1c(48fc)         3c INC A
ff1d(48fd)     32e5fe LD (&fee5),A
ff20(4900)     21e3fe LD HL,&fee3
ff23(4903)         be CP (HL)
ff24(4904)       2008 JR NZ,10
ff26(4906)     21e1fe LD HL,&fee1
ff29(4909)         34 INC (HL)
ff2a(490a)         af XOR A
ff2b(490b)     32e5fe LD (&fee5),A
ff2e(490e)     3a12b7 LD A,(&b712)
ff31(4911)         b7 OR A
ff32(4912)       201b JR NZ,29
ff34(4914)     3ae0fe LD A,(&fee0)
ff37(4917)         b7 OR A
ff38(4918)         c8 RET Z
ff39(4919)   dd21c7d3 LD IX,&d3c7
ff3d(491d)       0609 LD B,&09
ff3f(491f)     cd6aff CALL &ff6a
ff42(4922)     3ae0fe LD A,(&fee0)
ff45(4925)         b7 OR A
ff46(4926)         c8 RET Z
ff47(4927)     112800 LD DE,&0028
ff4a(492a)       dd19 ADD IX,DE
ff4c(492c)       10f1 DJNZ -13
ff4e(492e)         c9 RET
ff6a(494a)     dd7e08 LD A,(IX+8)
ff6d(494d)         b7 OR A
ff6e(494e)         c0 RET NZ
ff6f(494f)     21e7fe LD HL,&fee7
ff72(4952)         34 INC (HL)
ff73(4953)     21e0fe LD HL,&fee0
ff76(4956)     3a12b7 LD A,(&b712)
ff79(4959)         b7 OR A
ff7a(495a)       2801 JR Z,3
ff7c(495c)         23 INC HL
ff7d(495d)         35 DEC (HL)
ff7e(495e)     dd7e07 LD A,(IX+7)
ff81(4961)     dd7708 LD (IX+8),A
ff84(4964)     dd7e09 LD A,(IX+9)
ff87(4967)     dd770a LD (IX+10),A
ff8a(496a)     dd7e0b LD A,(IX+11)
ff8d(496d)     dd770c LD (IX+12),A
ff90(4970)     dd360d LD (IX+0),&0d
ff93(4973)         14 INC D
ff94(4974)     dd360e LD (IX+0),&0e
ff97(4977)       10dd DJNZ -33
ff99(4979)       360f LD (HL),&0f
ff9b(497b)         0c INC C
ff9c(497c)     dd3610 LD (IX+0),&10
ff9f(497f)       10dd DJNZ -33
ffa1(4981)       3623 LD (HL),&23
ffa3(4983)         6e LD L,(HL)
ffa4(4984)     dd3624 LD (IX+0),&24
ffa7(4987)         0c INC C
ffa8(4988)       0e96 LD C,&96
ffaa(498a)     3a12b7 LD A,(&b712)
ffad(498d)         b7 OR A
ffae(498e)       2802 JR Z,4
ffb0(4990)       0ea0 LD C,&a0
ffb2(4992)         79 LD A,C
ffb3(4993)         90 SUB A,B
ffb4(4994)         4f LD C,A
ffb5(4995)       3e6e LD A,&6e
ffb7(4997)         c5 PUSH BC
ffb8(4998)     cd0b83 CALL &830b
ffbb(499b)         2b DEC HL
ffbc(499c)     3a39b6 LD A,(&b639)
ffbf(499f)         3c INC A
ffc0(49a0)         90 SUB A,B
ffc1(49a1)     dd7717 LD (IX+23),A
ffc4(49a4)       360c LD (HL),&0c
ffc6(49a6)         c1 POP BC
ffc7(49a7)     3a06b7 LD A,(&b706)
ffca(49aa)         b7 OR A
ffcb(49ab)       280c JR Z,14
ffcd(49ad)     3a12b7 LD A,(&b712)
ffd0(49b0)         b7 OR A
ffd1(49b1)       2806 JR Z,8
ffd3(49b3)     dd3624 LD (IX+0),&24
ffd6(49b6)         3c INC A
ffd7(49b7)       363c LD (HL),&3c
ffd9(49b9)     3a11b7 LD A,(&b711)
ffdc(49bc)         3c INC A
ffdd(49bd)     dd771c LD (IX+28),A
ffe0(49c0)     3a12b7 LD A,(&b712)
ffe3(49c3)         b7 OR A
ffe4(49c4)         c0 RET NZ
ffe5(49c5)       3e0a LD A,&0a
ffe7(49c7)         90 SUB A,B
ffe8(49c8)         5f LD E,A
ffe9(49c9)       1600 LD D,&00
ffeb(49cb)     213ab6 LD HL,&b63a
ffee(49ce)         19 ADD HL,DE
ffef(49cf)       3600 LD (HL),&00
fff1(49d1)         c9 RET
fff2(49d2)       368c LD (HL),&8c
fff4(49d4)         23 INC HL
fff5(49d5)       3664 LD (HL),&64
fff7(49d7)         23 INC HL
fff8(49d8)       363c LD (HL),&3c
fffa(49da)         23 INC HL
fffb(49db)       3664 LD (HL),&64
fffd(49dd)         c9 RET
