describe("Controller Test", function () {
    describe("dashboardCtrl Test", function () {
        beforeEach(module("MainApp"));
        var dashboardCtrl,
            scope,
            rootScope,
            timeout,
            $httpBackend,
            ChkAuthen,
            DashboardService;
        beforeEach(inject(function ($rootScope, $controller, $q, $timeout, dashboardService, $injector) {
            DashboardService = dashboardService;
            scope = $rootScope.$new();
            chkAuthen = ChkAuthen;
            //$rootScope.globalPermission = "testdata";
            rootScope = $rootScope;
            ChkAuthen = {xxx: "xxx"};
            dashboardCtrl = $controller("dashboardCtrl", {
                $scope: scope,
                $rootScope: rootScope,
                dashboardService: dashboardService,
                ChkAuthen: ChkAuthen
            });
            deferred = $q.defer();
            timeout = $timeout;
            $httpBackend = $injector.get('$httpBackend');

        }));

        it("initMT method call", function () {
            //'/allure/getCurrentCustomer'
            //dashboardService
            var obj = undefined;

            var spand = {Count: 1021};
            var spandError = {Count: 0};

            var resultCus = [];
            resultCus[0] = {
                total: 1000
            };
            resultCus[1] = {
                total: 100
            };
            resultCus[2] = {
                total: 10
            };

            var resultA = [];
            resultA[0] = {
                totaltypeA: 1000
            };
            resultA[1] = {
                totaltypeA: 100
            };
            resultA[2] = {
                totaltypeA: 10
            };
            resultA[3] = {
                totaltypeA: 0
            };

            var resultB = [];
            resultB[0] = {
                totaltypeB: 1000
            };
            resultB[1] = {
                totaltypeB: 100
            };
            resultB[2] = {
                totaltypeB: 10
            };

            var resultC = [];
            resultC[0] = {
                totaltypeC: 1000
            };
            resultC[1] = {
                totaltypeC: 100
            };
            resultC[2] = {
                totaltypeC: 10
            };

            var resultNotype = [];
            resultNotype[0] = {
                Total: 1000
            };

            var resultDrilldown = [];
            resultDrilldown[0] = {
                Total: 1000
            };

            var resultBC = [];
            resultBC[0] = {
                totaltypeBC: 1000
            };
            resultBC[1] = {
                totaltypeBC: 100
            };
            resultBC[2] = {
                totaltypeBC: 10
            };

            var resultcount = [];
            resultcount[0] = [];

            resultcount[0][1] =
            {
                _id: "MyID",
                balance: 233186.0290399999
            };

            var result = [];
            result[0] = resultA;
            result[1] = resultB;
            result[2] = resultC;
            result[3] = resultNotype;
            result[4] = resultCus;
            result[6] = resultBC;
            result[7] = spand;
            result[8] = spandError;
            result[9] = resultcount;

            var totalLead = result[4][0].total;
            var totalAGrade = ((result[0][0].totaltypeA + result[0][1].totaltypeA + result[0][2].totaltypeA + result[0][3].totaltypeA) / totalLead * 100).toFixed(2);
            var totalBGrade = ((result[1][0].totaltypeB + result[1][1].totaltypeB + result[1][2].totaltypeB) / totalLead * 100).toFixed(2);
            var totalCGrade = ((result[2][0].totaltypeC + result[2][1].totaltypeC + result[2][2].totaltypeC) / totalLead * 100).toFixed(2);
            var totalBCGrade = ((result[6][0].totaltypeBC + result[6][1].totaltypeBC + result[6][2].totaltypeBC) / totalLead * 100).toFixed(2);

            $httpBackend.expectPOST('/allure/getAGradCustomer', obj).respond(200, resultA);
            $httpBackend.expectPOST('/allure/getBGradCustomer', obj).respond(200, resultB);
            $httpBackend.expectPOST('/allure/getCGradCustomer', obj).respond(200, resultC);
            $httpBackend.expectPOST('/allure/countCusNoSelectBusinessType', obj).respond(200, resultNotype);
            $httpBackend.expectPOST('/allure/getCurrentCustomer', obj).respond(200, resultCus);
            $httpBackend.expectPOST('/allure/getdashboardCustomers', obj).respond(200, resultDrilldown);
            $httpBackend.expectPOST('/allure/getBCGradCustomer', obj).respond(200, resultBC);
            $httpBackend.expectPOST('/allure/getSumSpendAdwords').respond(200, spand);
            $httpBackend.expectPOST('/allure/getSumErrorSpendAdwords').respond(200, spandError);
            $httpBackend.expectPOST('/allure/getSumCountSpendAdwords').respond(200, resultcount);

            scope.initMT();
            $httpBackend.flush();

            expect(scope.ActiveAd).toEqual(resultCus[0].total);
            expect(scope.CurrentCustomer).toEqual(Number(result[4][0].total) + Number(result[1].total) + Number(result[2].total));
            expect(scope.currentAGrade).toEqual([{totaltypeA: 1000}, {totaltypeA: 100}, {totaltypeA: 10}, {totaltypeA: 0}]);
            expect(scope.currentBGrade).toEqual([{totaltypeB: 1000}, {totaltypeB: 100}, {totaltypeB: 10}]);
            expect(scope.currentCGrade).toEqual([{totaltypeC: 1000}, {totaltypeC: 100}, {totaltypeC: 10}]);
            expect(scope.countCusNoSelectBusinessType).toEqual([{Total: 1000}]);
            expect(scope.inProcessCurrentCustomer).toEqual(Number(result[4][1].total));
            expect(scope.ActiveAd).toEqual(Number(result[4][0].total));
            expect(scope.newCurrentCustomer).toEqual(Number(result[4][2].total));
            expect(scope.getSumSpendAdwords).toEqual(Number(result[7].Count));
            expect(scope.getSumErrorSpendAdwords).toEqual(Number(result[8].Count));
            expect(scope.getSumCountSpendAdwords).toEqual(result[9][0].balance);

            //$scope.CurrentCustomer = Number(result[0].total)+Number(result[1].total)+Number(result[2].total);
            //$scope.ActiveAd = result[0].total;
        })

        it('getDataSpendAdword', function () {
            var Data01 = {
                Data: [{
                    AdGuide: "-",
                    AdTime: "24 ªÑèÇâÁ§",
                    AdTimeStatus: "0",
                    AdsPhone: "-",
                    CPD: 500,
                    CreateDateCS_AW: "Wed Dec 02 2015 15:30:11 GMT+0700 (SE Asia Standard Time)",
                    CreateDateCS_F: "Wed Dec 02 2015 15:35:54 GMT+0700 (SE Asia Standard Time)",
                    CurrentExpireDate: "Fri Mar 03 2017 00:00:00 GMT+0700 (SE Asia Standard Time)",
                    DefaultAd: 5000,
                    GoogleCustomerID: "339-846-2608",
                    Keywords: "-",
                    MemoText: "-",
                    MongoCreateDate: "2016-01-27",
                    OfficerFistName: "Sup Aey_MCC3",
                    OfficerLastName: "ÅÐÍÍ§´ÒÇ ¨Ó¹§¤ìÄ·¸Ôì (´ÒÇ)",
                    SpendData: Array[1],
                    StartAds: "Wed Jan 20 2016 09:17:34 GMT+0700 (SE Asia Standard Time)",
                    SumBudget: 400,
                    SumCost: 445.08,
                    Website: "www.boviga.com (GDN)",
                    __v: 3,
                    _id: "56a881a348d3c9fc308aa484",
                    bError: false,
                    bFollowStatus: "7",
                    bTotalSpends: true
                }]
            };

            var Data02 = {
                Data: [{
                    AdGuide: "-",
                    AdTime: "24 ªÑèÇâÁ§",
                    AdTimeStatus: "0",
                    AdsPhone: "-",
                    CPD: 500,
                    CreateDateCS_AW: "Wed Dec 02 2015 15:30:11 GMT+0700 (SE Asia Standard Time)",
                    CreateDateCS_F: "Wed Dec 02 2015 15:35:54 GMT+0700 (SE Asia Standard Time)",
                    CurrentExpireDate: "Fri Mar 03 2017 00:00:00 GMT+0700 (SE Asia Standard Time)",
                    DefaultAd: 5000,
                    GoogleCustomerID: "339-846-2608",
                    Keywords: "-",
                    MemoText: "-",
                    MongoCreateDate: "2016-01-27",
                    OfficerFistName: "Sup Aey_MCC3",
                    OfficerLastName: "ÅÐÍÍ§´ÒÇ ¨Ó¹§¤ìÄ·¸Ôì (´ÒÇ)",
                    SpendData: Array[1],
                    StartAds: "Wed Jan 20 2016 09:17:34 GMT+0700 (SE Asia Standard Time)",
                    SumBudget: 400,
                    SumCost: 445.08,
                    Website: "www.boviga.com (GDN)",
                    __v: 3,
                    _id: "56a881a348d3c9fc308aa484",
                    bError: false,
                    bFollowStatus: "7",
                    bTotalSpends: true
                }]
            };

            var Data03 = {
                Data: [{
                    AdGuide: "-",
                    AdTime: "24 ªÑèÇâÁ§",
                    AdTimeStatus: "0",
                    AdsPhone: "-",
                    CPD: 500,
                    CreateDateCS_AW: "Wed Dec 02 2015 15:30:11 GMT+0700 (SE Asia Standard Time)",
                    CreateDateCS_F: "Wed Dec 02 2015 15:35:54 GMT+0700 (SE Asia Standard Time)",
                    CurrentExpireDate: "Fri Mar 03 2017 00:00:00 GMT+0700 (SE Asia Standard Time)",
                    DefaultAd: 5000,
                    GoogleCustomerID: "339-846-2608",
                    Keywords: "-",
                    MemoText: "-",
                    MongoCreateDate: "2016-01-27",
                    OfficerFistName: "Sup Aey_MCC3",
                    OfficerLastName: "ÅÐÍÍ§´ÒÇ ¨Ó¹§¤ìÄ·¸Ôì (´ÒÇ)",
                    SpendData: Array[1],
                    StartAds: "Wed Jan 20 2016 09:17:34 GMT+0700 (SE Asia Standard Time)",
                    SumBudget: 400,
                    SumCost: 445.08,
                    Website: "www.boviga.com (GDN)",
                    __v: 3,
                    _id: "56a881a348d3c9fc308aa484",
                    bError: false,
                    bFollowStatus: "7",
                    bTotalSpends: true
                }]
            };
            var Data04 = {
                Data: [{
                    AdGuide: "-",
                    AdTime: "24 ªÑèÇâÁ§",
                    AdTimeStatus: "0",
                    AdsPhone: "-",
                    CPD: 500,
                    CreateDateCS_AW: "Wed Dec 02 2015 15:30:11 GMT+0700 (SE Asia Standard Time)",
                    CreateDateCS_F: "Wed Dec 02 2015 15:35:54 GMT+0700 (SE Asia Standard Time)",
                    CurrentExpireDate: "Fri Mar 03 2017 00:00:00 GMT+0700 (SE Asia Standard Time)",
                    DefaultAd: 5000,
                    GoogleCustomerID: "339-846-2608",
                    Keywords: "-",
                    MemoText: "-",
                    MongoCreateDate: "2016-01-27",
                    OfficerFistName: "Sup Aey_MCC3",
                    OfficerLastName: "ÅÐÍÍ§´ÒÇ ¨Ó¹§¤ìÄ·¸Ôì (´ÒÇ)",
                    SpendData: Array[1],
                    StartAds: "Wed Jan 20 2016 09:17:34 GMT+0700 (SE Asia Standard Time)",
                    SumBudget: 400,
                    SumCost: 445.08,
                    Website: "www.boviga.com (GDN)",
                    __v: 3,
                    _id: "56a881a348d3c9fc308aa484",
                    bError: false,
                    bFollowStatus: "7",
                    bTotalSpends: true
                }]
            };

            var result = [];
            result[0] = Data01;
            result[1] = Data02;
            result[2] = Data03;
            result[3] = Data04;


            $httpBackend.expectPOST('/allure/getCPDUpperListSpendAdwords').respond(200, Data01);
            $httpBackend.expectPOST('/allure/getCPDLowerListSpendAdwords').respond(200, Data02);
            $httpBackend.expectPOST('/allure/getCPDNospendListSpendAdwords').respond(200, Data03);
            $httpBackend.expectPOST('/allure/getCPDdErrorSpendListSpendAdwords').respond(200, Data04);
            scope.getDataSpendAdword();
            $httpBackend.flush();

            expect(scope.upperCPDUpperTotal).toEqual(result[0].Data.length);
            expect(scope.upperCPDUpperlist).toEqual(result[0].Data);

            expect(scope.upperCPDLowerTotal).toEqual(result[1].Data.length);
            expect(scope.upperCPDLowerUpperlist).toEqual(result[1].Data);

            expect(scope.upperCPDNospendUpperlistTotal).toEqual(result[2].Data.length);
            expect(scope.upperCPDNospendUpperlist).toEqual(result[2].Data);

            expect(scope.upperCPDNospendUpperlistTotal).toEqual(result[3].Data.length);
            expect(scope.upperCPDNospendUpperlist).toEqual(result[3].Data);


            expect(scope.showspendTable).toEqual(true);
        });
    });
});