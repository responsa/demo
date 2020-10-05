// -----------------------------------------
// [13/07/2020] Classe custom per la gestione del wizard
//
function CustomWizard() {
    // ----------------------
    // Costruttore
    //
    this.init = function () {
        var thisObj = this;

        // DEBUG mode
        this.debug = true;

        // Step corrente
        this.currentStep = '1';

        // Url chiamata ajax applicazione modifiche config
        // this.url_apply = obj_options.url_apply;

        // Setup step_1 di default
        this.showStep('1');

        /**
        * BIND | Click tasto "backward"
        */
        $('#bottom-wizard .backward').on('click', function (e) {
            e.preventDefault();
            thisObj.execBackward();
        });

        /**
        * BIND | Click tasto "forward"
        */
        $('#bottom-wizard .forward').on('click', function (e) {
            e.preventDefault();
            thisObj.execForward();
        });

        /**
        * BIND | Click tasto "submit"
        */
        $('#bottom-wizard .submit').on('click', function (e) {
            e.preventDefault();

            if (thisObj.validateCurrentStep()) {
                thisObj.submitForm('casa');
            }
        });

        /**
        * BIND | Click tasto "contact us"
        */
        $('#bottom-wizard .contact-us').on('click', function (e) {
            e.preventDefault();
            // alert('#bottom-wizard .contact-us'); return;
            thisObj.execForward();
        });

        /**
        * BIND | Click tasto "call"
        */
        $('#bottom-wizard .call').on('click', function (e) {
            e.preventDefault();

            // Forza prossimo stato
            thisObj.currentStep = '3D';

            // Rendeding DX
            thisObj.showStep();

            // Rendering SX
            thisObj.showSidebar();
        });

        /**
        * BIND | Click tasto "submit" richieste condominio
        */
        $('#bottom-wizard .contact-us-now').on('click', function (e) {
            e.preventDefault();

            if (thisObj.validateCurrentStep()) {
                thisObj.submitForm('cond');
            }

        });

        /**
        * BIND | Click checkbox step 1 > scroll to button position
        */
        $('input[name=question_2]').on('click', function (e) {
            document.getElementById("bottom-wizard").scrollIntoView();
        });

        /**
        * BIND | Apertura modale
        */
        $('.modal').on('shown.bs.modal', function (e)
        {
            var modal_id = $(this).attr('id');
            thisObj.showModal(modal_id);
        });

    };

    // ----------------------
    // AJAX | Invia il form
    //
    this.submitForm = function (type) {
        var thisObj = this;

        if (type == 'cond') {
            var url_to_call = $('.form_cond').attr('action');
            var data_to_post = $('.form_cond').serialize();
        }
        else {
            var url_to_call = $('.form_casa').attr('action');
            var data_to_post = $('.form_casa').serialize();
        }

        // Loading ON
        loadingON();
        // Animazione sul tasto
        $('.btnBgAnimation i').removeClass('d-none');
        // Rendi il tasto non cliccabile nuovamente
        $('.btnBgAnimation').prop( "disabled", true );

        // Jquery post
        $.post(url_to_call, data_to_post, function (response) {
            // Loading OFF
            loadingOFF();

            if (parseInt(response.status_code) == 1) {
                // Setta step finale

                thisObj.calcNextStep();

                // Rendeding DX
                thisObj.showStep();
    
                // Rendering SX
                thisObj.showSidebar();
            }
            else {
                themeAlert('warning', 'Errore di sistema');
                // Loading OFF
                loadingOFF();
            }
        }, "json").fail(function () {
            // Errore

            themeAlert('warning', 'Errore di sistema');
            // Loading OFF
            loadingOFF();
        });
    }

    // ----------------------
    // JS | Mostra eventuale sidebar associata allo step indicato
    //
    this.showSidebar = function () {

        var stepCode = this.currentStep;

        var sidebarStep = $('#left_form .sidebar[code=' + stepCode + ']');

        // SE esiste una sidebar associata
        if (sidebarStep.length > 0) {
            // Nascondi le altre sidebar
            $('#left_form .sidebar').addClass('d-none');

            // Mostra sidebar
            sidebarStep.removeClass('d-none');
        }
    }

    // ----------------------
    // JS | Setup della zona superiore che indica la % di completamento
    //
    this.setupProgressBar = function () {
        // #progressbar
        // console.log(this.currentStep);
    }

    // ----------------------
    // JS | Mostra/Nascondi i tasti a seconda della posizione dell'utente
    //
    this.setupActionButton = function (mode) {
        $('#bottom-wizard .myBtn').addClass('d-none');

        switch (mode) {
            case 'forward-only':
                $('#bottom-wizard .forward').removeClass('d-none');
                break;
            case 'backward-forward':
                $('#bottom-wizard .backward').removeClass('d-none');
                $('#bottom-wizard .forward').removeClass('d-none');
                break;
            case 'submit':
                $('#bottom-wizard .backward').removeClass('d-none');
                $('#bottom-wizard .submit').removeClass('d-none');
                break;
            case 'hide-all':
                break;
            // Condominio
            case '3B':
                $('#bottom-wizard .backward').removeClass('d-none');
                $('#bottom-wizard .contact-us').removeClass('d-none');
                $('#bottom-wizard .call').removeClass('d-none');
                break;
            case '3C':
                $('#bottom-wizard .backward').removeClass('d-none');
                // $('#bottom-wizard .contact-us-now').removeClass('d-none');
                break;
            case '3D':
                $('#bottom-wizard .backward').removeClass('d-none');
                $('#bottom-wizard .call-now').removeClass('d-none');
                break;
        }

        var btnCounter = $('#bottom-wizard .myBtn').not('.d-none').length;
        if (btnCounter > 2) {
            $('#bottom-wizard .myBtn').addClass('my-btn-small');
        }
        else {
            $('#bottom-wizard .myBtn').removeClass('my-btn-small');
        }

    };

    // ----------------------
    // JS | Esegui l'azione "indietro"
    //
    this.execBackward = function () {
        var nextStep = this.calcPevStep();

        this.showStep(nextStep);

        this.showSidebar(nextStep);
    };

    // ----------------------
    // JS | Esegui l'azione "avanti"
    //
    this.execForward = function () {
        // Procedi solo se i dati sono ok
        if (this.validateCurrentStep()) {
            // Calcola prossimo step
            this.calcNextStep();

            // Rendeding DX
            this.showStep();

            // Rendering SX
            this.showSidebar();
        }
        else {
            console.log('validate FAIL');
            return;
        }
    };

    // ----------------------
    // JS | Valida i dati del corrente step
    //
    this.validateCurrentStep = function () {
        // Calcola il corrente step

        var boolReturn = true;

        // Valida i dati e mostra gli eventuali errori
        switch (this.currentStep) {
            // -------------------------------------------
            case '2':
                if ($('input[name=question_2]:checked').length == 0) {
                    $('input[name=question_2]').parent().addClass('is-invalid');
                    $('.question_2_warning').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('input[name=question_2]').parent().removeClass('is-invalid');
                    $('.question_2_warning').removeClass('d-block');
                }

                break;
            // -------------------------------------------
            case '3':
                var arr_item = ['input[name=casa_n_ind]'];

                arr_item.forEach(function (input_name, index) {
                    if ($(input_name).val().trim() == '' || parseInt($(input_name).val()) < 0 || (input_name=='input[name=casa_n_ind]' && (parseInt($(input_name).val()) < 1 || parseInt($(input_name).val()) > 8) )  )
                    {
                        $(input_name).addClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').addClass('d-block');
                        boolReturn = false;
                    }
                    else {
                        $(input_name).removeClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').removeClass('d-block');
                    }
                });

                break;
            // -------------------------------------------
            case '3_1':
                var arr_item = ['input[name=casa_sup_a]'];

                arr_item.forEach(function (input_name, index) {
                    if ($(input_name).val().trim() == '' || parseInt($(input_name).val()) < 0 || (input_name=='input[name=casa_n_ind]' && (parseInt($(input_name).val()) < 1 || parseInt($(input_name).val()) > 8) )  )
                    {
                        $(input_name).addClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').addClass('d-block');
                        boolReturn = false;
                    }
                    else {
                        $(input_name).removeClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').removeClass('d-block');
                    }
                });

                break;
            // -------------------------------------------
            case '3_2':
                var arr_item = ['input[name=casa_sup_b]'];

                arr_item.forEach(function (input_name, index) {
                    if ($(input_name).val().trim() == '' || parseInt($(input_name).val()) < 0 || (input_name=='input[name=casa_n_ind]' && (parseInt($(input_name).val()) < 1 || parseInt($(input_name).val()) > 8) )  )
                    {
                        $(input_name).addClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').addClass('d-block');
                        boolReturn = false;
                    }
                    else {
                        $(input_name).removeClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').removeClass('d-block');
                    }
                });

                break;
            // -------------------------------------------
            case '3_3':
                var arr_item = ['input[name=casa_sup_c]'];

                arr_item.forEach(function (input_name, index) {
                    if ($(input_name).val().trim() == '' || parseInt($(input_name).val()) < 0 || (input_name=='input[name=casa_n_ind]' && (parseInt($(input_name).val()) < 1 || parseInt($(input_name).val()) > 8) )  )
                    {
                        $(input_name).addClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').addClass('d-block');
                        boolReturn = false;
                    }
                    else {
                        $(input_name).removeClass('is-invalid');
                        $(input_name).parent().siblings('.invalid-feedback').removeClass('d-block');
                    }
                });

                break;
            // -------------------------------------------
            case '5':

                if ($('input[name=casa_nominative]').val().trim() == '') {
                    $('input[name=casa_nominative]').addClass('is-invalid');
                    $('input[name=casa_nominative]').parent().siblings('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('input[name=casa_nominative]').removeClass('is-invalid');
                    $('input[name=casa_nominative]').parent().siblings('.invalid-feedback').removeClass('d-block');
                }

                if ($('input[name=casa_email]').val().trim() == '' || !validateEmail($('input[name=casa_email]').val().trim())) {
                    $('input[name=casa_email]').addClass('is-invalid');
                    $('input[name=casa_email]').parent().siblings('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('input[name=casa_email]').removeClass('is-invalid');
                    $('input[name=casa_email]').parent().siblings('.invalid-feedback').removeClass('d-block');
                }

                if (!$('#f_cond_use_agree').is(':checked')) {
                    $('#f_cond_use_agree').addClass('is-invalid');
                    $('#f_cond_use_agree').parent().siblings('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('#f_cond_use_agree').removeClass('is-invalid');
                    $('#f_cond_use_agree').parent().siblings('.invalid-feedback').removeClass('d-block');
                }

                if (!$('#f_casa_terms').is(':checked')) {
                    $('#f_casa_terms').addClass('is-invalid');
                    $('#f_casa_terms').parents('.form-group').find('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('#f_casa_terms').removeClass('is-invalid');
                    $('#f_casa_terms').parents('.form-group').find('.invalid-feedback').removeClass('d-block');
                }

                break;
            // -------------------------------------------
            case '3C':
                if ($('.form_cond #f_cond_nominative').val().trim() == '') {
                    $('.form_cond #f_cond_nominative').addClass('is-invalid');
                    $('.form_cond #f_cond_nominative').parent().siblings('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('.form_cond #f_cond_nominative').removeClass('is-invalid');
                    $('.form_cond #f_cond_nominative').parent().siblings('.invalid-feedback').removeClass('d-block');
                }

                if ($('.form_cond #f_cond_email').val().trim() == '' || !validateEmail($('.form_cond #f_cond_email').val().trim())) {
                    $('.form_cond #f_cond_email').addClass('is-invalid');
                    $('.form_cond #f_cond_email').parent().siblings('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('.form_cond #f_cond_email').removeClass('is-invalid');
                    $('.form_cond #f_cond_email').parent().siblings('.invalid-feedback').removeClass('d-block');
                }

                if (!$('.form_cond #f_cond_terms').is(':checked')) {
                    $('.form_cond #f_cond_terms').addClass('is-invalid');
                    $('.form_cond #f_cond_terms').parent().siblings('.invalid-feedback').addClass('d-block');
                    boolReturn = false;
                }
                else {
                    $('.form_cond #f_cond_terms').removeClass('is-invalid');
                    $('.form_cond #f_cond_terms').parent().siblings('.invalid-feedback').removeClass('d-block');
                }

                break;
            // -------------------------------------------
            case '3D':
                alert('todo');
                break;
        }

        // SE ci sono errori scrolla su al form
        if (boolReturn == false) { document.getElementById("myBody").scrollIntoView(); }

        // Torna true/false

        return boolReturn;
    };

    // ----------------------
    // JS | Mostra solo lo step indicato
    //
    this.showStep = function () {
        var stepCode = this.currentStep;

        // Nascondi tutti gli step
        $('#middle-wizard .step, .form_casa').addClass('d-none');

        // Mostra lo step richiesto
        var stepToShow = $('#middle-wizard .step[code=' + stepCode + ']');
        $(stepToShow).removeClass('d-none');

        // BTN in base allo step
        switch (stepCode) {
            case '1':
                this.setupActionButton('forward-only');
                break;
            case '2':
                this.setupActionButton('backward-forward');
                break;
            case '3':
            case '3_1':
            case '3_2':
            case '3_3':
                this.setupActionButton('backward-forward');
                $('.form_casa').removeClass('d-none');
                break;
            case '4':
                this.setupActionButton('backward-forward');
                $('.form_casa').removeClass('d-none');
                break;
            case '5':
                this.setupActionButton('submit');
                $('.form_casa').removeClass('d-none');
                break;
            case '6':
                this.setupActionButton('hide-all');
                $('.form_casa').removeClass('d-none');
                break;
            case '3B':
                this.setupActionButton(stepCode);
                break;
            case '3C':
                this.setupActionButton(stepCode);
                break;
            case '3D':
                this.setupActionButton(stepCode);
                break;
        }

        if (stepCode == '1') { $('#left_form').parent().removeClass('d-none d-md-block'); }
        else { $('#left_form').parent().addClass('d-none d-md-block'); }

        // Progressbar
        this.setupProgressBar();
    }

    // ----------------------
    // JS | In base allo step corrente ed alle scelte fatte calcola il prossimo step
    //
    this.calcNextStep = function () {
        var currStepActive = $('#middle-wizard .step').not('.d-none').first();
        var currStep = $(currStepActive).attr('code');
        var nextStep = '';

        // Calcolo prossimo step
        switch (currStep) {
            // ---------
            case '1':
                nextStep = '2';
                break;
            // ---------
            case '2':
                // Qui logica extra in base alla scelta
                var userChose = $('input[name=question_2]:checked').val();

                if (userChose == 'condominio') { nextStep = '3B'; }
                else { nextStep = '3'; }

                break;
            // ---------
            case '3':
                nextStep = '3_1';
                break;
            // ---------
            case '3_1':
                nextStep = '3_2';
                break;
            // ---------
            case '3_2':
                nextStep = '3_3';
                break;
            // ---------
            case '3_3':
                nextStep = '4';
                break;
            // ---------
            case '4':
                nextStep = '5';
                break;
            // ---------
            case '5':
                nextStep = '6';
                break;
            // ---------
            case '3B':
                nextStep = '3C';
                break;
        }

        // Setta il next step a livello oggetto
        this.currentStep = nextStep;

        return nextStep;
    };

    // ----------------------
    // JS | In base allo step corrente ed alle scelte fatte calcola il precedente step
    //
    this.calcPevStep = function () {
        var currStepActive = $('#middle-wizard .step').not('.d-none').first();
        var currStep = $(currStepActive).attr('code');
        var nextStep = '';

        // Calcolo prossimo step
        switch (currStep) {
            // ---------
            case '2':
                nextStep = '1';
                break;
            // ---------
            case '3':
                nextStep = '2';
                break;
            // ---------
            case '3_1':
                nextStep = '3';
                break;
            // ---------
            case '3_2':
                nextStep = '3_1';
                break;
            // ---------
            case '3_3':
                nextStep = '3_2';
                break;
            // ---------
            case '4':
                nextStep = '3_3';
                break;
            // ---------
            case '5':
                nextStep = '4';
                break;
            // ---------
            case '3B':
                nextStep = '2';
                break;
            // ---------
            case '3C':
                nextStep = '3B';
                break;
            // ---------
            case '3D':
                nextStep = '3B';
                break;
        }

        // Setta il next step a livello oggetto
        this.currentStep = nextStep;

        return nextStep;
    };

    // ----------------------
    // JS/AJAX | Mostra i modali informativi. SE non hanno contenuto caricalo da pagina esterna
    //
    this.showModal = function (modal_id) {
        // SE il contenuto e' presente > apri solo il modale
        // SE non e' presente > chiamata ajax per la lettura del testo
        if ($('#' + modal_id + ' .modal-body').html() == '<i class="icon-spin3 animate-spin"></i>') {
            // Ajax per lettura valori
            var file_to_call = 'https://landing.gruppogenovese.it/info-simulatore/';
            var page_id = $('#' + modal_id).attr('extid');

            $('#' + modal_id + ' .modal-body').load(file_to_call + ' #' + page_id);
        }

        // Mostra modale
        // $('#' + modal_id).modal('toggle');
    };

}