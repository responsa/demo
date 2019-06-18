
            CQ_Analytics.registerAfterCallback(function(options) {
                if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                    return false;    // component not in framework, skip SC callback
                CQ_Analytics.Sitecatalyst.saveEvars();
                CQ_Analytics.Sitecatalyst.updateEvars(options);
                CQ_Analytics.Sitecatalyst.updateLinkTrackVars();
                return false;
            }, 10);
    
            CQ_Analytics.registerAfterCallback(function(options) {
                if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                    return false;    // component not in framework, skip SC callback
                s = s_gi("helvglobalprod,helv.it.prod");
                if (s.linkTrackVars == "None") {
                    s.linkTrackVars = "events";
                } else {
                    s.linkTrackVars = s.linkTrackVars + ",events";
                }
                CQ_Analytics.Sitecatalyst.trackLink(options);
                return false;
            }, 100);
    
    
            CQ_Analytics.registerAfterCallback(function(options) {
                if(!options.compatibility && $CQ.inArray( options.componentPath, CQ_Analytics.Sitecatalyst.frameworkComponents) < 0 )
                    return false;    // component not in framework, skip SC callback
                CQ_Analytics.Sitecatalyst.restoreEvars();
                return false;
            }, 200);
    
            CQ_Analytics.adhocLinkTracking = "false";
            
    
            var s_account = "helvglobalprod,helv.it.prod";
            var s = s_gi(s_account);
            
            s.fpCookieDomainPeriods = "2";
            s.trackDownloadLinks= true;
        s.charSet= 'UTF-8';
        s.linkExternalFilters= '';
        s.eVar8= 'D=r';
        s.eVar7= 'D=g';
        s.eVar10= 'D=pageName';
        s.eVar6= 'D=c6';
        s.eVar5= 'D=c5';
        s.eVar4= 'D=c4';
        s.trackExternalLinks= true;
        s.linkLeaveQueryString= false;
        s.eVar3= 'D=c3';
        s.eVar2= 'D=c2';
        s.hier1= 'D=pageName';
        s.trackInlineStats= true;
        s.prop8= 'D=r';
        s.prop7= 'D=g';
        s.ssl= true;
        s.linkDownloadFileTypes= 'exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls';
        s.linkTrackVars= 'None';
        s.linkTrackEvents= 'None';
        s.eVar1= 'D=c1';
        s.currencyCode= 'USD';
        s.linkInternalFilters= 'javascript:,'+window.location.hostname;
        
        s.visitorNamespace = "helvetia";
        s.trackingServer = "metrics.helvetia.com";
        s.trackingServerSecure = "smetrics.helvetia.com";
        
        

